import { Callback, Context, Handler } from "aws-lambda";
import { S3 } from "aws-sdk";
import { simpleParser } from "mailparser";
import {
  getInvite,
  isInviteValid,
  updateBusiness,
  sendEmailReceipt,
} from "./functions";
import { uploadPhoto } from "./upload-photo";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  try {
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );
    const s3 = new S3();

    const data = await s3
      .getObject({ Bucket: srcBucket, Key: srcKey })
      .promise();

    if (data.Body) {
      const email = await simpleParser(data.Body.toString());
      const subject = email.subject;

      if (subject) {
        const invite = await getInvite(subject);
        const weShouldProceed = await isInviteValid(invite);

        if (weShouldProceed) {
          const thereIsAnAttachment = email.attachments[0]?.content;
          if (thereIsAnAttachment) {
            const filePath = `${invite.businessId}/public/header.jpeg`;

            await uploadPhoto(email.attachments[0].content, filePath);

            await updateBusiness(invite.businessId, {
              description: email.text,
              headerImage: `https://byblk-business-bucket.s3.amazonaws.com/${filePath}`,
            });
          } else {
            await updateBusiness(invite.businessId, {
              description: email.text,
            });
          }

          if (email.from?.text) {
            await sendEmailReceipt(email.from?.text);
          }
        } else throw new Error("invite invalid af");
      } else throw new Error("email cannot be parsed");
    } else throw new Error("no email found");
  } catch (e) {
    throw new Error(e);
  }
};

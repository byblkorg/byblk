import { Callback, Context, Handler } from "aws-lambda";
import { S3 } from "aws-sdk";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  const sesNotification = event.Records[0].ses;
  const s3 = new S3();

  if (sesNotification && process.env.bucketName) {
    s3.getObject(
      {
        Bucket: process.env.bucketName,
        Key: sesNotification.mail.messageId,
      },
      function (err, data) {
        if (err) {
          console.log(err, err.stack);
          cb(err);
        } else {
          console.log("Raw email:\n" + data.Body);
          // Custom email processing goes here
          cb(null, null);
        }
      }
    );
  } else {
    throw new Error(`messageId body is missing from ${event}`);
  }
};

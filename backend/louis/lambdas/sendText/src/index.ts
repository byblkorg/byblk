import { Callback, Context, Handler } from "aws-lambda";
import { SNS } from "aws-sdk";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  const invitee = event.invitee;

  if (invitee) {
    const attributes = {
      attributes: {
        DefaultSMSType: "Transactional",
      },
    };

    const params = {
      Message: `
      Thanks for joining ByBlk! To complete the signup process as a business owner, please email our virtual assistant Marvin at marvin@byblk.org. \n In the subject line, please put ONLY the invite code so that Marvin can properly parse your email and update your business information in our database. \n You are allowed to attach one image to your email. This image will be used on the site for your business' profile. \n If we receive the appropriate amount of funding, my first priority is to build a business dashboard so that you can edit your business page at your convenience! \n This is an automated message. Please do not respond. :-). \n Your invite code is: ${invitee.eventCode}`,
      PhoneNumber: invitee.phone,
    };

    const sns = new SNS({ apiVersion: "2010-03-31" });

    await sns.setSMSAttributes(attributes).promise();

    return await sns.publish(params).promise();
  } else {
    throw new Error(`Invitee information is missing from ${event}`);
  }
};

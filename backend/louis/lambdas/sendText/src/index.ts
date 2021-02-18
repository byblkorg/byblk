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
      Message: `Thanks for joining ByBlk! To start the sign up process as a business owner, please text ${invitee.eventCode} to our virtual assistant, Marvin, at +1 (111) - 999 888.`,
      PhoneNumber: invitee.phone,
    };

    const sns = new SNS({ apiVersion: "2010-03-31" });

    await sns.setSMSAttributes(attributes).promise();

    return await sns.publish(params).promise();
  } else {
    throw new Error(`Invitee information is missing from ${event}`);
  }
};

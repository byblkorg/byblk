import { Callback, Context, Handler } from "aws-lambda";
import { SNS } from "aws-sdk";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  const messageBody: {
    inviteCode: string;
    phoneNumber: string;
  } = event.messageBody;

  if (messageBody) {
    const attributes = {
      attributes: {
        DefaultSMSType: "Transactional",
      },
    };

    const params = {
      Message: `Thanks for joining ByBlk! To start the sign up process as a business owner, please text ${messageBody.inviteCode} to our virtual assistant, Marvin, at +1 (111) - 999 888.`,
      PhoneNumber: messageBody.phoneNumber,
    };

    const sns = new SNS({ apiVersion: "2010-03-31" });

    await sns.setSMSAttributes(attributes).promise();

    return await sns.publish(params).promise();
  } else {
    throw new Error(`Message body is missing from ${event}`);
  }
};

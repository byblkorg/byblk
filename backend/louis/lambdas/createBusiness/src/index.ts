import { adminCreateCognitoUser, addUserToGroup } from "./admin-cognito";
import { Callback, Context, Handler } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { Invitee } from "@gcmp/types";
import addBusiness from "./addBusiness";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
): Promise<void> => {
  const cognitoIdentityService = new CognitoIdentityServiceProvider({
    region: process?.env.REGION,
  });
  const invitee: Invitee = event.invitee;

  if (invitee) {
    const params = {
      UserPoolId: process.env.POOL_ID,
      Username: invitee?.phoneNumber,
      TemporaryPassword: event.temporaryPassword,
      UserAttributes: [
        {
          Name: "email",
          Value: invitee?.email,
        },
        {
          Name: "phone_number",
          Value: invitee?.phoneNumber,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    };

    const newCognitoUser: any = await adminCreateCognitoUser(
      cognitoIdentityService,
      params
    );

    const UpdateGroupParams = {
      GroupName: "Business",
      UserPoolId: process.env.POOL_ID as string,
      Username: newCognitoUser.User.Username,
    };

    await addUserToGroup(cognitoIdentityService, UpdateGroupParams);

    return addBusiness(invitee, newCognitoUser.User.Username);
  }
};

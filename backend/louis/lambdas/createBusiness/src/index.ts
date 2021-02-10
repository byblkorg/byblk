import { adminCreateCognitoUser, addUserToGroup } from "./admin-cognito";
import { Callback, Context, Handler } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { Invitee } from "@gcmp/types";
import addBusiness from "./addBusiness";
import postInvite from "./postInvite";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
): Promise<Invitee> => {
  try {
    const cognitoIdentityService = new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

    const invitee: Invitee = event.invitee;

    const params = {
      UserPoolId: process.env.POOL_ID,
      Username: invitee.phoneNumber,
      TemporaryPassword: invitee.temporaryPassword,
      UserAttributes: [
        {
          Name: "email",
          Value: invitee.email,
        },
        {
          Name: "phone_number",
          Value: invitee.phoneNumber,
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

    const createBusinessRes = await addBusiness(invitee);

    await postInvite({
      ...invitee,
      businessId: createBusinessRes.createBusiness.id,
    });

    return invitee;
  } catch (e) {
    throw new Error(e);
  }
};

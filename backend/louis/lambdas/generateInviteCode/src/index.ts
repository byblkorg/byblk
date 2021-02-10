import { Callback, Context, Handler } from "aws-lambda";
import { generateInviteCode } from "./functions";
import { Invitee } from "@gcmp/types";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
): Promise<Invitee> => {
  const invitee: Invitee = event.invitee;
  if (invitee) {
    const inviteCode = generateInviteCode({
      businessName: invitee.name,
      countryShortCode: invitee.countryShortCode,
      regionName: invitee.regionName,
    });

    return {
      ...invitee,
      eventCode: inviteCode,
    };
  } else {
    throw new Error(`Invitee information is missing from ${event}`);
  }
};

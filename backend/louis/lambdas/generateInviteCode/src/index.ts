import { Callback, Context, Handler } from "aws-lambda";
import { generateInviteCode } from "./functions";
import postInvite from "./postInvite";
import { Invitee } from "@gcmp/types";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
): Promise<void> => {
  const invitee: Invitee = event.invitee;
  if (invitee) {
    const inviteCode = generateInviteCode(invitee);
    return await postInvite({
      ...invitee,
      eventCode: inviteCode,
    });
  } else {
    throw new Error(`Invitee information is missing from ${event}`);
  }
};

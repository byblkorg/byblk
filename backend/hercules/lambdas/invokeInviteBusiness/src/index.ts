import { inviteBusinessStateFunction } from "./state-function";
import { Invitee } from "@gcmp/types";

export const handler = async (event: any) => {
  if (event.invitee) {
    const invitee: Invitee = event.invitee;
    await inviteBusinessStateFunction(invitee);
    return true;
  } else {
    throw new Error(`Lambda is missing invitee information, event is ${event}`);
  }
};

import { StepFunctions } from "aws-sdk";
import { Invitee } from "@gcmp/types";

export async function inviteBusinessStateFunction(invitee: Invitee) {
  const stepFunctions = new StepFunctions({
    region: process?.env.region ?? "us-east-1",
  });

  return new Promise((resolve, reject): any => {
    const params: StepFunctions.StartExecutionInput = {
      stateMachineArn:
        "arn:aws:states:us-east-1:750494921159:stateMachine:InviteBusiness",
      input: JSON.stringify({
        invitee,
      }),
    };

    stepFunctions.startExecution(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

import { query } from "@gcmp/geoffrey";
import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import { DocumentType, Invitee } from "@gcmp/types";
import gql from "graphql-tag";
require("isomorphic-fetch");

export default function postInvite(invitee: Invitee) {
  const client = new AWSAppSyncClient({
    disableOffline: true,
    url:
      "https://knvgtx7b4fco3c5a6dh25wdvie.appsync-api.us-east-1.amazonaws.com/graphql",
    region: "us-east-1",
    auth: {
      type: AUTH_TYPE.AWS_IAM,
      credentials: {
        accessKeyId: "AKIA25PH3WHDS33NPLBK",
        secretAccessKey: "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",
      },
    },
  });

  const CreateInvite = gql`
    mutation CreateInvite($input: InviteInput!) {
      createInvite(input: $input) {
        id
      }
    }
  `;

  return query({
    client,
    documentType: DocumentType.mutation,
    document: CreateInvite,
    variables: {
      input: {
        id: invitee.eventCode,
        businessId: invitee.businessId,
        createdAt: ~~(+new Date() / 1000),
        expires: ~~(+new Date() / 1000) + 604800,
        createdBy: invitee.createdBy,
      },
    },
  });
}

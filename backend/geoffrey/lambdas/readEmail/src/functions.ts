import { Invite } from "@gcmp/types";
import { query, DocumentType } from "@gcmp/geoffrey";
import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import gql from "graphql-tag";
import { sendEmail } from "./send-email";
require("isomorphic-fetch");

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

export async function getInvite(id: string): Promise<Invite> {
  const GetInviteByCode = gql`
    query getInviteByCode($id: String!) {
      getInviteByCode(id: $id) {
        id
        expires
        businessId
      }
    }
  `;

  try {
    const data = await query({
      client,
      documentType: DocumentType.query,
      document: GetInviteByCode,
      variables: {
        id,
      },
    });

    return data.getInviteByCode as Invite;
  } catch (e) {
    throw new Error(e);
  }
}

export function isInviteValid(invite: Invite): boolean {
  const today = ~~(+new Date() / 1000);
  if (invite.expires < today) {
    return false;
  } else {
    return true;
  }
}

export async function updateBusiness(
  id: string,
  variables: {
    description?: string;
    headerImage?: string;
  }
) {
  const UpdateBusiness = gql`
    mutation updateBusiness($input: EditBusinessInput!) {
      updateBusiness(input: $input) {
        id
      }
    }
  `;

  try {
    await query({
      client,
      documentType: DocumentType.mutation,
      document: UpdateBusiness,
      variables: {
        input: {
          id,
          ...variables,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function sendEmailReceipt(email: string) {
  await sendEmail(email);
}

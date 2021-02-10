import { query } from "@gcmp/geoffrey";
import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import { DocumentType, Invitee } from "@gcmp/types";
import gql from "graphql-tag";
require("isomorphic-fetch");

function removeSpecialChars(str: string) {
  return str
    .replace(/[`~!@#$%^&*()|+\-=?;:'",<>]/, "")
    .split(".")
    .join("");
}

function parseString(str: string) {
  return removeSpecialChars(str).toLowerCase();
}

function slugifyString(str: string) {
  return str.toLowerCase().replace(/ /g, "_");
}

export default function createBusiness(invitee: Invitee) {
  if (!invitee?.country || !invitee?.state || !invitee?.city) {
    throw new Error("Missing business details. Cannot create business");
  }

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

  const CreateBusiness = gql`
    mutation createBusiness($input: CreateBusinessInput!) {
      createBusiness(input: $input) {
        id
      }
    }
  `;

  const rcsc = `${parseString(invitee.regionName)}_${parseString(
    invitee.country
  )}_${parseString(invitee.state)}_${parseString(invitee.city)}`;

  return query({
    client,
    documentType: DocumentType.mutation,
    document: CreateBusiness,
    variables: {
      input: {
        name: invitee.name,
        address: invitee.address,
        email: invitee.email,
        slug: slugifyString(invitee.name),
        rcsc,
        description: invitee.description,
        headerImage: invitee.headerImage,
        tags: invitee.tags,
      },
    },
  });
}

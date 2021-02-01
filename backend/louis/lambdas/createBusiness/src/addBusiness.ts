import { query } from "@gcmp/geoffrey";
import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import { DocumentType, Invitee } from "@gcmp/types";
import gql from "graphql-tag";

export default function createBusiness(invitee: Invitee, id: string) {
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
        createdAt
        expires
        createdBy
      }
    }
  `;

  return query({
    client,
    documentType: DocumentType.mutation,
    document: CreateBusiness,
    variables: {
      createdAt: ~~(+new Date() / 1000),
      expires: ~~(+new Date() / 1000) + 604800,
      name: invitee.businessName,
      createdBy: invitee.createdBy,
      id: invitee.eventCode,
      address: invitee.address,
      description: invitee.description,
      headerImage: invitee.headerImage,
      tags: invitee.tags,
    },
  });
}

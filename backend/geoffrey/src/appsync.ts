import { AWSAppSyncClient } from "aws-appsync";

export enum DocumentType {
  query = "query",
  mutation = "mutation",
  subscription = "subscription",
}

export async function query({
  client,
  variables,
  documentType,
  document,
}: {
  client: AWSAppSyncClient<any>;
  variables?: { [key: string]: any };
  documentType: DocumentType;
  document: string;
}): Promise<void> {
  try {
    await client.hydrated();

    if (documentType === DocumentType.query) {
      const transactionComplete: any = await client.query({
        [documentType]: document,
        fetchPolicy: "no-cache",
        variables,
      });

      return transactionComplete.data;
    } else if (documentType === DocumentType.mutation) {
      const transactionComplete: any = await client.mutate({
        [documentType]: document,
        fetchPolicy: "no-cache",
        variables,
      });

      return transactionComplete.data;
    } else {
      throw new Error("We are not supporting subscriptions at this time.");
    }
  } catch (err) {
    throw new Error(err);
  }
}

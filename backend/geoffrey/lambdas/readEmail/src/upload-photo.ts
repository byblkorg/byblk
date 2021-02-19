import { S3 } from "aws-sdk";

export const uploadPhoto = (body: Buffer, path: string) => {
  const s3 = new S3();

  const params = {
    Bucket: "byblk-business-bucket",
    Key: path,
    Body: body,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

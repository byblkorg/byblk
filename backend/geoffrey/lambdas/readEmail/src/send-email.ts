import { SES } from "aws-sdk";
import nodemailer from "nodemailer";
const ses = new SES();

export async function sendEmail(to: string): Promise<any> {
  return new Promise((resolve, reject): any => {
    const options = {
      from: "marvin@byblk.org",
      subject: "Submission Received",
      html:
        "Hi, there. Just writing to let you know that I have received and parsed your submission. If you see anything wrong, please reach out to the volunteer who signed you up!",
      to,
    };

    const transporter = nodemailer.createTransport({
      SES: ses,
    });

    transporter.sendMail(options, (err: any, info: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

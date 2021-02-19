import sgMail from "@sendgrid/mail";

export async function sendEmail(to: string): Promise<any> {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const newMessage = {
      to,
      subject: "Submission Received",
      from: "marvin@byblk.org",
      content: [
        {
          type: "text/html",
          value: `
      Hi, there. 
      
      Just writing to let you know I've received and parsed your submission. 
      
      If you see anything wrong, please contact your volunteer!
  
      Thanks for joining ByBlk!
      `,
        },
      ],
    };
    try {
      //@ts-ignore
      await sgMail.send(newMessage);
    } catch (e) {
      throw new Error(e);
    }
  }
}

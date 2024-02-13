import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const sendEmail = async (
  email: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log("Server validation failed.");
        console.table(error);
        return false;
      } else {
        console.log("Server validation done and ready for messages.");
      }
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent sucessfully");
    return true;
  } catch (error) {
    console.log("Email not sent");
    console.table(error);
    return false;
  }
};

export const sendConfirmationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verification?token=${token}`;
  return sendEmail(
    email,
    "Next Auth - Confirm Email",
    "",
    `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  );
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  return sendEmail(
    email,
    "Next Auth - Reset Password",
    "",
    `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`
  );
};

export default sendEmail;

import nodemailer from "nodemailer";
import "dotenv/config";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY)

export const verifyEmail = async (token, email) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Account verification link",
      html: `<p>Hello, Were happy to have you on board. To start shopping please confirm your email address.</p>
      <a href="https://ecommerce-project-tan-alpha.vercel.app/verify/${token}" class="button-link">Verify Now</a> <p>Best Regards, ECommerce Team</p>
      `,
    });
    console.log("Verification link sent successfully");
    console.log(data);
  } catch (error) {
    if (error) throw Error(error);
    console.log(error);
  }
};

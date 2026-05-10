import nodemailer from "nodemailer";
import "dotenv/config";
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOTP = async (otp, email) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Verification Code",
      html: `<h1>Your OTP: ${otp}</h1> <p>for resetting the password. Valid for only 10 minutes.</p>`,
    })

   

    console.log("OTP Email Sent Successfully");
    console.log(data);

  } catch (error) {
    console.error("Mail Error:", error.message);
    throw error;
  }
};
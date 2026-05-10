import nodemailer from "nodemailer";
import "dotenv/config";
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOTP = async (otp, email) => {
  try {
    const data = await resend.emails.send({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      html: `<h1>Your OTP: ${otp}</h1>`,
    })

   

    console.log("OTP Email Sent Successfully");
    console.log(info);

  } catch (error) {
    console.error("Mail Error:", error.message);
    throw error;
  }
};
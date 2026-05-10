import nodemailer from "nodemailer";
import "dotenv/config";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

export const sendOTP = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      html: `<h1>Your OTP: ${otp}</h1>`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("OTP Email Sent Successfully");
    console.log(info);

  } catch (error) {
    console.error("Mail Error:", error.message);
    throw error;
  }
};
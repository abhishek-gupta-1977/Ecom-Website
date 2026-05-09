import nodemailer from "nodemailer";
export const sendOTP = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "OTP Verification",

    text: `Hi! There, We have got a request that you forgot your password.
           Here is the OTP for resetting the password: ${otp}.
           This OTP is only valid for 10 minutes.
           Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("OTP Email Sent Successfully");
    console.log(info);
  });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }
};

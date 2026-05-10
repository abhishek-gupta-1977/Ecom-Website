import React from "react";
import { MailCheck } from "lucide-react";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1E5F8] via-white to-[#BBC4EB] px-4">
      <div className="bg-white/80 backdrop-blur-lg border border-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md mx-4 sm:mx-0 text-center">
        
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#6D5DFC]/10 mb-6">
          <MailCheck className="w-10 h-10 text-[#6D5DFC]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1B4B] mb-4">
          Verify Your Email
        </h2>

        <p className="text-gray-600 leading-relaxed">
          We've sent a verification link to your email address.
          <br />
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="mt-8 text-sm text-[#6D5DFC] font-medium">
          Didn’t receive it? Check spam folder.
        </div>
      </div>
    </div>
  );
};

export default Verify;
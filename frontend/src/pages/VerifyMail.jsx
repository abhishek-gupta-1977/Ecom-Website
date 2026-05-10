import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyMail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const verifyMail = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setStatus("Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setStatus("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    verifyMail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full mx-4 sm:mx-0 text-center border border-white">

        <div className="mb-6 flex justify-center">
          {success === null ? (
            <Loader2 className="w-14 h-14 animate-spin text-[#6D5DFC]" />
          ) : success ? (
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500" />
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#1E1B4B] mb-4">
          Email Verification
        </h2>

        <p className="text-gray-600">{status}</p>

        {success && (
          <p className="text-sm text-[#6D5DFC] mt-4">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyMail;
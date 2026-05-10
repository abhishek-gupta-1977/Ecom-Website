import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyResetOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/verify-otp/${email}`,
        { otp }
      );
console.log("EMAIL:", email);
      if (res.data.success) {
        toast.success(res.data.message);
        
        navigate("/change-password", {
          state: { email },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1E5F8] via-white to-[#BBC4EB] px-4">
      <Card className="w-full max-w-md rounded-3xl border border-[#BBC4EB] shadow-2xl bg-white overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-[#2218A7] to-[#737CCF]" />

        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-[#E1E5F8] p-4 rounded-full mb-4">
            <ShieldCheck className="h-8 w-8 text-[#2218A7]" />
          </div>

          <CardTitle className="text-3xl font-bold text-[#2218A7]">
            Verify OTP
          </CardTitle>

          <p className="text-gray-500">
            Enter the OTP sent to your email
          </p>
        </CardHeader>

        <CardContent className="px-8">
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="h-14 text-center text-lg sm:text-xl tracking-[8px] sm:tracking-[16px] rounded-xl border-[#BBC4EB]"
          />
        </CardContent>

        <CardFooter className="px-8 pb-8">
          <Button
            onClick={submitHandler}
            className="w-full h-12 rounded-xl bg-[#2218A7] hover:bg-[#737CCF]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyResetOTP;
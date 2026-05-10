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
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/verify-reset-otp", {
          state: { email, isReset: true },
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
            <Mail className="h-8 w-8 text-[#2218A7]" />
          </div>

          <CardTitle className="text-3xl font-bold text-[#2218A7]">
            Forgot Password
          </CardTitle>

          <p className="text-gray-500 mt-2">
            Enter your email to receive OTP
          </p>
        </CardHeader>

        <CardContent className="px-5 sm:px-8">
          <Label className="text-[#2218A7]">Email</Label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#BBC4EB] rounded-xl h-12 mt-2"
            placeholder="Enter your email"
          />
        </CardContent>

        <CardFooter className="px-5 sm:px-8 pb-6 sm:pb-8">
          <Button
            onClick={submitHandler}
            className="w-full h-12 rounded-xl bg-[#2218A7] hover:bg-[#737CCF]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
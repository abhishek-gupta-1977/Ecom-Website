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
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

const SignUP = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        inputData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1E5F8] via-white to-[#BBC4EB] px-4">
      <Card className="w-full max-w-md mx-4 sm:mx-0 rounded-3xl border border-[#BBC4EB] shadow-2xl bg-white overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-[#2218A7] to-[#737CCF]" />

        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-[#E1E5F8] p-4 rounded-full w-fit mb-4">
            <UserPlus className="h-8 w-8 text-[#2218A7]" />
          </div>

          <CardTitle className="text-3xl font-bold text-[#2218A7]">
            Create Account
          </CardTitle>

          <p className="text-gray-500 mt-2">
            Start your smarter shopping journey
          </p>
        </CardHeader>

        <CardContent className="space-y-5 px-5 sm:px-8">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[#2218A7]">First Name</Label>
              <Input
                name="firstName"
                value={inputData.firstName}
                onChange={handleInputChange}
                className="border-[#BBC4EB] rounded-xl h-12"
              />
            </div>

            <div>
              <Label className="text-[#2218A7]">Last Name</Label>
              <Input
                name="lastName"
                value={inputData.lastName}
                onChange={handleInputChange}
                className="border-[#BBC4EB] rounded-xl h-12"
              />
            </div>
          </div>

          <div>
            <Label className="text-[#2218A7]">Email</Label>
            <Input
              name="email"
              type="email"
              value={inputData.email}
              onChange={handleInputChange}
              className="border-[#BBC4EB] rounded-xl h-12"
            />
          </div>

          <div className="relative">
            <Label className="text-[#2218A7]">Password</Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={inputData.password}
              onChange={handleInputChange}
              className="border-[#BBC4EB] rounded-xl h-12 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-[#737CCF]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-5 px-5 sm:px-8 pb-6 sm:pb-8">
          <Button
            onClick={submitHandler}
            className="w-full h-12 rounded-xl bg-[#2218A7] hover:bg-[#737CCF]"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2218A7] font-semibold hover:text-[#737CCF]"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUP;
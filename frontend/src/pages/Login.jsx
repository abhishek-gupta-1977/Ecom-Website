import React, { useState } from "react";
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
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
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

        {/* Top Accent */}
        <div className="h-3 bg-gradient-to-r from-[#2218A7] to-[#737CCF]" />

        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-[#E1E5F8] p-4 rounded-full w-fit mb-4">
            <ShoppingBag className="h-8 w-8 text-[#2218A7]" />
          </div>

          <CardTitle className="text-3xl font-bold text-[#2218A7]">
            Welcome Back
          </CardTitle>

          <p className="text-gray-500 mt-2">
            Login to continue shopping smarter
          </p>
        </CardHeader>

        <CardContent className="space-y-5 px-5 sm:px-8">
          <div className="space-y-2">
            <Label className="text-[#2218A7] font-medium">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={inputData.email}
              onChange={handleInputChange}
              className="border-[#BBC4EB] focus:border-[#2218A7] focus:ring-[#2218A7] rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[#2218A7] font-medium">
                Password
              </Label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#737CCF] hover:text-[#2218A7]"
              >
                Forgot Password?
              </Link>
            </div>

            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              value={inputData.password}
              onChange={handleInputChange}
              className="border-[#BBC4EB] focus:border-[#2218A7] rounded-xl h-12"
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-5 px-8 pb-8">
          <Button
            onClick={submitHandler}
            className="w-full h-12 rounded-xl bg-[#2218A7] hover:bg-[#737CCF] text-white font-semibold transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>

          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#2218A7] font-semibold hover:text-[#737CCF]"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
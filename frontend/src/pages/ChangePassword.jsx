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
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/change-password/${email}`,
        passwords
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
      
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
            <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-[#2218A7]" />
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-bold text-[#2218A7]">
            Change Password
          </CardTitle>

          <p className="text-gray-500">
            Set your new secure password
          </p>
        </CardHeader>

        <CardContent className="space-y-5 px-8">
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handleChange}
              className="h-12 rounded-xl border-[#BBC4EB]"
            />
          </div>

          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="h-12 rounded-xl border-[#BBC4EB]"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-[#737CCF]"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-8">
          <Button
            onClick={submitHandler}
            className="w-full h-12 rounded-xl bg-[#2218A7] hover:bg-[#737CCF]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangePassword;
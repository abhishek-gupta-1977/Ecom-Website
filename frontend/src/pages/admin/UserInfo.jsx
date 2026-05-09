import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import userLogo from "../../../public/profile.webp";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const [updateUser, setUpdateUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken")
const dispatch = useDispatch()
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("email", updateUser.email);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error?.response?.data);

      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/get-user/${userId}`,{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetails()
  },[])
  return (
    <div className="pt-5 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="flex justify-between gap-10 w-1/4">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="font-semibold text-xl text-gray-800">
              Update Profile
            </h1>
          </div>
          <div className="w-full flex items-center justify-center gap-10  px-7 max-w-2xl mt-10">
            <div className="flex flex-col items-center gap-4">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile picture"
                className="h-32 w-32 rounded-full object-cover border-2 border-blue-400"
                onChange={handleChange}
              />
              <Label className="p-2 bg-blue-400 text-white text-sm rounded-xl  text-center cursor-pointer">
                Choose Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </Label>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <Label className="text-sm block font-medium">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={updateUser?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="text-sm block font-medium">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label className="w-full block text-sm font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  disabled
                  className="w-full border rounded-lg py-2 px-3 mt-1"
                  value={updateUser?.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  name="phoneNo"
                  placeholder="Enter your Contact no."
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full rounded-lg px-3 py-2 mt-1"
                  value={updateUser?.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">City</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter your city name"
                  className="w-full rounded-lg px-3 py-2 mt-1"
                  value={updateUser?.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Zip Code</Label>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="Enter Zip Code"
                  className="w-full rounded-lg px-3 py-2 mt-1"
                  value={updateUser?.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 mt-5">
                <Label >Role:</Label>
                <RadioGroup value={updateUser?.role} onValueChange={(value) => setUser(value)} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="user" id="user"/>
                    <Label htmlFor="user">User</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="admin" id="admin"/>
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="w-full h-14 bg-[#F97316] hover:bg-[#EA580C] rounded-xl text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" /> Please wait...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.webp";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import CompletedOrders from "@/components/CompletedOrders";
const Profile = () => {
  const user = useSelector((store) => store.user.user);
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNo: user?.phoneNo,
    email: user?.email,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    role: user?.role,
    profilePic:user?.profilePic
  });

  const [file, setFile] = useState(null);

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
      console.log(error.response.data);

      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#BBC4EB] min-h-screen pt-20">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center py-10 ">
        <TabsList className=" border-[#737CCF] border-b-2 mb-5">
          <TabsTrigger className="data-[state=active]:bg-[#2218A7] data-[state=active]:text-white" value="profile">Profile</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-[#2218A7] data-[state=active]:text-white" value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100 p-10 rounded-xl">
              <h1 className="font-bold mb-7 text-2xl text-[#2218A7]">
                Update Profile
              </h1>
              <div className="w-full flex items-center justify-center gap-10  px-7 max-w-2xl">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={updateUser?.profilePic }
                    alt="profile picture"
                    className="h-32 w-32 rounded-full object-cover border-1 border-[#737CCF]"
                    value={updateUser?.profilePic}
                  />
                  <Label className="p-2 bg-[#737CCF] hover:bg-[#2218A7] text-white text-sm rounded-xl  text-center cursor-pointer">
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
                  className="space-y-4 shadow-xl p-5 rounded-xl bg-white border border-[#BBC4EB]"
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
                        value={updateUser.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="text-sm block font-medium">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={updateUser.lastName}
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
                      value={updateUser.email}
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
                      value={updateUser.phoneNo}
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
                      value={updateUser.address}
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
                      value={updateUser.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter Zip Code"
                      className="w-full rounded-lg px-3 py-2 mt-1"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#2218A7] hover:bg-[#737CCF] text-white font-medium py-2 rounded-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" /> Please
                        wait...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders" >
          <CompletedOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

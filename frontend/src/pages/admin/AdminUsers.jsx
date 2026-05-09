import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Box, Search, User2 } from "lucide-react";
import UserLogo from "../../assets/user.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7001/api/v1/user/all-user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-10 pl-[350px] pt-16 bg-[#E1E5F8] min-h-screen">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2218A7]">
          User Management
        </h1>
        <p className="text-[#737CCF] mt-2">
          Manage and monitor all registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-4 text-[#737CCF]" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="pl-12 h-14 rounded-2xl border-[#BBC4EB] bg-white focus:ring-2 focus:ring-[#737CCF]"
        />
      </div>

      {/* User Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-[#BBC4EB] shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-5">
              <img
                src={user?.profilePic || UserLogo}
                className="rounded-full w-20 h-20 object-cover border-4 border-[#737CCF]/30"
                alt=""
              />

              <div>
                <h2 className="text-xl font-semibold text-[#2218A7]">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-[#737CCF] text-sm">
                  {user.email}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    user.role === "admin"
                      ? "bg-[#2218A7] text-white"
                      : "bg-[#BBC4EB] text-[#2218A7]"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() =>
                  navigate(`/dashboard/users/user-orders/${user._id}`)
                }
                className="flex-1 bg-[#737CCF] hover:bg-[#626ac2] text-white rounded-xl"
              >
                <Box size={18} />
                Orders
              </Button>

              <Button
                onClick={() =>
                  navigate(`/dashboard/user/${user._id}`)
                }
                className="flex-1 bg-[#2218A7] hover:bg-[#1a1285] text-white rounded-xl"
              >
                <User2 size={18} />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
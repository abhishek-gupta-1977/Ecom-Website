import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <div className="w-full max-w-7xl py-20 mx-auto bg-[w--]/60 my-5 rounded-3xl">
      <div className="flex items-center justify-center grid-cols-3 gap-20">
        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center justify-center h-12 w-12 bg-[#F8FAFC] rounded-full ">
            <Truck className="h-6 w-6 text-[#111827] " />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-[#111827]">Free shipping</p>
            <p className="text-sm text-[#64748B]">on orders above 50$</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center justify-center h-12 w-12 bg-[#F8FAFC] rounded-full ">
            <Shield className="h-6 w-6 text-[#111827] " />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-[#111827]">Secured Payments</p>
            <p className="text-sm text-[#64748B]">
              Seamless decentralized payments
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center justify-center h-12 w-12 bg-[#F8FAFC] rounded-full ">
            <Headphones className="h-6 w-6 text-[#111827] " />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-[#111827]">24/7 Support</p>
            <p className="text-sm text-[#64748B]">
              Customer support all the time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

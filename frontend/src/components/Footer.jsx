import React from "react";
import {
  FaDiscord,
  FaSquareXTwitter,
  FaSquareFacebook,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white ">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
              Company
            </h2>
            <ul className="text-body font-medium">
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
              Help center
            </h2>
            <ul className="text-body font-medium">
              <li className="mb-4 gap-3 flex items-center text-[#BBC4EB] hover:text-white">
                <FaDiscord />
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4 flex items-center gap-3 text-[#BBC4EB] hover:text-white">
                <FaSquareXTwitter />

                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4 flex items-center gap-3 text-[#BBC4EB] hover:text-white">
                <FaSquareFacebook />
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4 flex items-center gap-3 text-[#BBC4EB] hover:text-white">
                <RiCustomerServiceFill />
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
              Legal
            </h2>
            <ul className="text-body font-medium">
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
              Download
            </h2>
            <ul className="text-body font-medium">
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4 text-[#BBC4EB] hover:text-white">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span className="text-sm text-body sm:text-center">
            © 2023 Dribble. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 gap-5 flex-wrap rtl:space-x-reverse text-white">
            <FaFacebook />
            <FaDiscord />
            <FaTwitter />
            <FaGithub />
            <FaDribbble />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

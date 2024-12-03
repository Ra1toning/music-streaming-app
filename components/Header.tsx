// components/Header.tsx
"use client";

import { HiHome, HiSearch } from "react-icons/hi";
import Image from "next/image";
import Button from "./Button";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="h-fit mx-6 my-2 shadow-md">
      <div className="w-full flex items-center justify-between">
        {/* Лого (Том дэлгэцэнд харагдана) */}
        <div className="hidden md:flex items-center gap-x-2">
          <Image src="/images/logo.png" alt="Sonara Logo" width={40} height={40} />
          <h1 className="text-white text-xl font-bold">Sonara</h1>
        </div>

        {/* Хайлтын хэсэг (Том дэлгэцэнд харагдана) */}
        <div className="hidden md:flex items-center bg-neutral-800 rounded-2xl px-4 py-2 w-[450px]">
          <HiSearch className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        {/* Жижиг дэлгэцэнд Search товч */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* Sign In болон Sign Up товчнууд */}
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button onClick={() => {}} className="bg-transparent text-neutral-300 font-medium">Sign up</Button>
            </div>
            <div>
              <Button onClick={() => {}} className="bg-white px-6 py-2">Log in</Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
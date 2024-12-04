"use client";

import { HiHome, HiSearch } from "react-icons/hi";
import Image from "next/image";
import Button from "./Button";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { userUser } from "@/hooks/useUser";

const Header = () => {

  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = userUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      console.log(error);
    }
  };

  const handleSearchClick = () => {
    router.push("/search");
  };

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
            onClick={handleSearchClick}
          />
        </div>

        {/* Жижиг дэлгэцэнд Search товч */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={handleSearchClick}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* Sign In болон Sign Up товчнууд болон Profile */}
        {user ? (
          <div className="flex items-center gap-x-4">
            {/* Logout Button */}
            <Button onClick={handleLogout} className="bg-white px-6 py-2">Logout</Button>
            {/* Profile image */}
            <div className="mr-10 rounded-full bg-neutral-600 cursor-pointer flex items-center">
              {user?.user_metadata?.avatar_url ? (
                <Image 
                  src={user?.user_metadata?.avatar_url} 
                  alt="User Avatar" 
                  width={40} 
                  height={40} 
                  className=" absolute object-cover rounded-full" 
                />
              ) : (
                <p></p>
              )}
            </div>

          </div>
        ) : (
          <div className="flex justify-between items-center gap-x-4">
            <div>
              <Button onClick={() => authModal.onOpen("sign_up")} className="bg-transparent text-neutral-300 font-medium">Sign up</Button>
            </div>
            <div>
              <Button onClick={() => authModal.onOpen("sign_in")} className="bg-white px-6 py-2">Log in</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

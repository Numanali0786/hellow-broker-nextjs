"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import axios from "axios";

import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { SidebarTrigger } from "./ui/sidebar";
import { DotIcon, UserRound } from "lucide-react";
const Navbar = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<Role | null>(null);
  console.log(role);
  useEffect(() => {
    const getRole = async () => {
    const role = await axios.get("/api/utils/role");
      setRole(role.data?.role);}
      user && isLoaded && getRole();
  
  }, [user, isLoaded]);
  return (
    <header className="z-10 bg-blue-100 sticky top-0 w-full border-2 flex justify-between items-center p-3 gap-4 h-16">
      <p className="text-white ml-4 font-semibold tracking-wide">
        Hellow Broker
      </p>
      <div className="flex justify-between items-center gap-6">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
            <Button
              className="bg-button-pink cursor-pointer"
              onClick={() => router.push("/user-dashboard")}
            >
              Add Listing
            </Button>
          {role === "ADMIN" && (
            <Button
              className="bg-button-pink cursor-pointer"
              onClick={() => router.push("/admin")}
            >
              Dashboard
            </Button>
          )}
 <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Profile"
            labelIcon={<UserRound />}
            onClick={()=>redirect('/profile')}
          />
        </UserButton.MenuItems>
      </UserButton>        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import HomeSearch from "@/components/HomeSearch";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const App = () => {
  // ✅ Step 1: Get current user from Clerk

  const { isLoaded, user } = useUser();

 
  return (
    <main className="bg-[url('https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg')] bg-cover bg-center h-screen bg-no-repeat absolute top-0 w-full">
      <div className="z-1 bg-[rgba(0,0,0,.8)] flex justify-center items-center h-full">
        <div className="homecenter text-center flex flex-col gap-6">
          {/* <h4 className="text-3xl font-semibold tracking-wide text-white"> */}
          {/* Find Your Dream House. */}
          <TypeAnimation
            className="text-white"
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Find Your Dream Appartment.",
              3000, // wait 1s before replacing "Mice" with "Hamsters"
              "Find Your Dream House.",
              3000,
              "Find Your Dream Villa.",
              3000,
              "Find Your Dream Flat.",
              3000,
            ]}
            wrapper="span"
            speed={20}
            style={{ fontSize: "3em", display: "inline-block" }}
            repeat={Infinity}
          />
          {/* </h4> */}
          <p className="text-white">We Have the best Properties For You.</p>
          <HomeSearch />
        </div>
      </div>
    </main>
  );
};

export default App;

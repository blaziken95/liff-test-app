"use client";

import { useState, useEffect } from "react";
import liff from "@line/liff";
import LoginButton from "@/components/LoginButton";
import LiffEnvironmentInfo from "@/components/LiffEnvironmentInfo";
import UserProfile from "@/components/UserProfile";
import Troubleshooting from "@/components/Troubleshooting";
import UserFriendshipInfo from "@/components/UserFriendshipInfo";
import { SpeedInsights } from "@vercel/speed-insights/next"; //vercel speed insights

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          console.error("LIFF ID is missing. Please set NEXT_PUBLIC_LIFF_ID in .env.local");
          return;
        }

        await liff.init({ liffId });
        setIsInitialized(true);
        setIsLoggedIn(liff.isLoggedIn());
      } catch (error) {
        console.error("Error initializing LIFF:", error);
      }
    };

    initializeLiff();
  }, []);

  return (
    <>
      <SpeedInsights />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-8 overflow-y-auto">
        <div className="flex space-x-8">
          <div className="space-y-8">
            <LiffEnvironmentInfo />
            <UserProfile isLoggedIn={isLoggedIn} />
            <UserFriendshipInfo isLoggedIn={isLoggedIn} />
            <LoginButton isInitialized={isInitialized} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
          <Troubleshooting />
        </div>
      </div>
    </>
  );
}
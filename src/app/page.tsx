"use client";

import { useState, useEffect } from "react";
import liff from "@line/liff";
import LoginButton from "@/components/LoginButton";
import LiffEnvironmentInfo from "@/components/LiffEnvironmentInfo";
import UserProfile from "@/components/UserProfile";
import Troubleshooting from "@/components/Troubleshooting";
import UserFriendshipInfo from "@/components/UserFriendshipInfo";
import { SpeedInsights } from "@vercel/speed-insights/next"; // vercel speed insights
import DappPortalLayout from "@/components/DappPortalLayout"; // Import the new layout
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    // Ensure this effect only runs on the client
    if (typeof window !== 'undefined') {
      console.log("Component mounted on client");
    }
  }, []);

  const handleGoToDappTest = () => {
    router.push('/dapp-test'); // Navigate to the Dapp Test page
  };

  return (
    <DappPortalLayout>
      <SpeedInsights />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-8 overflow-y-auto">
        <div className="flex w-full max-w-4xl space-x-8">
          <div className="flex-1 space-y-8">
            <LiffEnvironmentInfo />
            <UserProfile isLoggedIn={isLoggedIn} />
            <UserFriendshipInfo isLoggedIn={isLoggedIn} />
          </div>
          <div className="flex flex-col space-y-4">
            <LoginButton 
              isInitialized={isInitialized} 
              isLoggedIn={isLoggedIn} 
              setIsLoggedIn={setIsLoggedIn} 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            <button 
              onClick={handleGoToDappTest}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Go to Dapp Test
            </button>
            <Troubleshooting />
          </div>
        </div>
      </div>
    </DappPortalLayout>
  );
}
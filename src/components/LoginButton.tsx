"use client";

import { Dispatch, SetStateAction } from "react";
import liff from "@line/liff";

type LoginButtonProps = {
    isInitialized: boolean;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export default function LoginButton({ isInitialized, isLoggedIn, setIsLoggedIn }: LoginButtonProps) {
    const handleLogin = async () => {
        try {
            if (!isInitialized) {
                console.error("LIFF is not initialized.");
                return;
            }

            if (!liff.isLoggedIn()) {
                console.log("User is not logged in, proceeding to login.");
                liff.login();
                const profile = await liff.getProfile();
                const idToken = liff.getIDToken();
                console.log("User Profile:", {
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    statusMessage: profile.statusMessage,
                    idToken
                });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogout = async () => {
        try {
            if (isInitialized) {
                liff.logout();
                console.log("Logged out successfully");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={handleLogin}
                disabled={isLoggedIn}
                className={`px-12 py-6 rounded-xl text-white transition duration-200 text-3xl font-bold ${
                    isLoggedIn ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                Login
            </button>
            <button
                onClick={handleLogout}
                disabled={!isLoggedIn}
                className={`px-12 py-6 rounded-xl text-white transition duration-200 text-3xl font-bold ${
                    !isLoggedIn ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
            >
                Logout
            </button>
        </div>
    );
}
"use client";

import React, { Dispatch, SetStateAction } from "react";
import liff from "@line/liff";

interface LoginButtonProps {
    isInitialized: boolean;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isInitialized, isLoggedIn, setIsLoggedIn, className }) => {
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
        <div className="flex flex-col space-y-4">
            <button
                onClick={handleLogin}
                disabled={isLoggedIn}
                className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
            >
                Login
            </button>
            <button
                onClick={handleLogout}
                disabled={!isLoggedIn}
                className={`px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${className}`}
            >
                Logout
            </button>
        </div>
    );
};

export default LoginButton;
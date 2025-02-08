"use client";

type LoginStatusProps = {
    isLoggedIn: boolean;
};

export default function LoginStatus({ isLoggedIn }: LoginStatusProps) {
    return (
        <div className="text-xl font-semibold text-black">
            {isLoggedIn ? "You are logged in to LINE" : "You are not logged in to LINE"}
        </div>
    );
} 
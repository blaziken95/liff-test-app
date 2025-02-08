"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Profile } from "./UserProfile";

type UserFriendshipInfoProps = {
    isLoggedIn: boolean;
};

type Friendship = {
    friendFlag: boolean;
};

export default function UserFriendshipInfo({ isLoggedIn }: UserFriendshipInfoProps) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [friendship, setFriendship] = useState<Friendship | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isLoggedIn) {
                try {
                    const userProfile = await liff.getProfile();
                    setProfile(userProfile);

                    const friendshipStatus = await liff.getFriendship();
                    setFriendship(friendshipStatus);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            }
        };

        fetchUserInfo();
    }, [isLoggedIn]);

    useEffect(() => {
        console.info("UserFriendshipInfo component loaded");
    }, []);

    if (!isLoggedIn) {
        return <div className="text-lg text-black p-4 border rounded-md shadow-md">User info not available. Please log in.</div>;
    }

    return (
        <div className="text-lg text-black p-4 border rounded-md shadow-md max-w-md max-h-80 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">User Friendship Information</h2>
            {profile ? (
                <div>
                    <div><strong>User ID:</strong> {profile.userId}</div>
                    <div><strong>Display Name:</strong> {profile.displayName}</div>
                    <div><strong>Status Message:</strong> {profile.statusMessage || "No status message available"}</div>
                </div>
            ) : (
                <div>Profile information not available</div>
            )}
            {friendship ? (
                <div><strong>Friendship Status:</strong> {friendship.friendFlag ? "Friends" : "Not Friends"}</div>
            ) : (
                <div>Friendship information not available</div>
            )}
        </div>
    );
} 
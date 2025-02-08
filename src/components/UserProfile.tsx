"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import Image from 'next/image';

type UserProfileProps = {
    isLoggedIn: boolean;
};

export type Profile = {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
};

type DecodedIdToken = {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    iat?: number;
    name?: string;
    picture?: string;
    email?: string;
    // Add any other fields that are part of the decoded ID token
};

export default function UserProfile({ isLoggedIn }: UserProfileProps) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [decodedIdToken, setDecodedIdToken] = useState<DecodedIdToken | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (isLoggedIn) {
                try {
                    const userProfile = await liff.getProfile();
                    setProfile(userProfile);

                    const accessToken = liff.getAccessToken();
                    setAccessToken(accessToken);

                    const decodedIdToken = liff.getDecodedIDToken();
                    setDecodedIdToken(decodedIdToken);

                    const idToken = liff.getIDToken();
                    setIdToken(idToken);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [isLoggedIn]);

    useEffect(() => {
        console.info("UserProfile component loaded");
    }, []);

    if (!isLoggedIn) {
        return <div className="user-profile text-lg text-black p-4 border rounded-md shadow-md">Not logged in, cannot display user data.</div>;
    }

    if (!profile) {
        return null; // Optionally, you could show a loading indicator here
    }

    return (
        <div className="user-profile text-lg text-black p-4 border rounded-md shadow-md max-w-md max-h-80 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">User Profile Information</h2>
            <div><strong>User ID:</strong> {profile.userId}</div>
            <div><strong>Display Name:</strong> {profile.displayName}</div>
            <div><strong>Status Message:</strong> {profile.statusMessage || "No status message available"}</div>
            <div>
                {profile.pictureUrl ? (
                    <Image src={profile.pictureUrl} alt="Profile" width={64} height={64} className="rounded-full" />
                ) : (
                    <div>No profile picture available</div>
                )}
            </div>
            <div><strong>Access Token:</strong> {accessToken || "Not available"}</div>
            <div><strong>Decoded ID Token:</strong> {decodedIdToken ? JSON.stringify(decodedIdToken, null, 2) : "Not available"}</div>
            <div><strong>ID Token:</strong> {idToken || "Not available"}</div>
        </div>
    );
}
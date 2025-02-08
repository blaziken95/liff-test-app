"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

// Define a type for the context
type LiffContext = {
    type: string;
    viewType?: string; // Allow viewType to be undefined
    // Add other properties as needed based on the LIFF documentation
};

export default function LiffEnvironmentInfo() {
    const [liffId, setLiffId] = useState<string | null | undefined>(undefined);
    const [os, setOs] = useState<string | null | undefined>(undefined);
    const [appLanguage, setAppLanguage] = useState<string | null | undefined>(undefined);
    const [language, setLanguage] = useState<string | null | undefined>(undefined);
    const [version, setVersion] = useState<string | null | undefined>(undefined);
    const [lineVersion, setLineVersion] = useState<string | null | undefined>(undefined);
    const [context, setContext] = useState<LiffContext | null | undefined>(undefined);
    const [isInClient, setIsInClient] = useState<boolean | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const fetchLiffInfo = async () => {
            try {
                const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
                setLiffId(liffId);

                if (liffId) {
                    await liff.init({ liffId: liffId });
                    setOs(liff.getOS());
                    setAppLanguage(liff.getAppLanguage());
                    setLanguage(liff.getLanguage());
                    setVersion(liff.getVersion());
                    setLineVersion(liff.getLineVersion());
                    setContext(liff.getContext());
                    setIsInClient(liff.isInClient());
                    setIsLoggedIn(liff.isLoggedIn());
                }
            } catch (error) {
                console.error("Error fetching LIFF environment info:", error);
            }
        };

        fetchLiffInfo();
    }, []);

    useEffect(() => {
        console.info("LiffEnvironmentInfo component loaded");
    }, []);

    return (
        <div className="liff-environment-info text-lg text-black p-4 border rounded-md shadow-md max-w-md max-h-80 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">LIFF Environment Information</h2>
            <div><strong>LIFF ID:</strong> {liffId || "Not configured"}</div>
            <div><strong>OS:</strong> {os || "Unavailable"}</div>
            <div><strong>App Language:</strong> {appLanguage || "Unavailable"}</div>
            <div><strong>Language:</strong> {language || "Unavailable"}</div>
            <div><strong>Version:</strong> {version || "Unavailable"}</div>
            <div><strong>LINE Version:</strong> {lineVersion || "Unavailable"}</div>
            <div><strong>Context:</strong> {context ? JSON.stringify(context, null, 2) : "Unavailable"}</div>
            <div><strong>Running in LINE Client:</strong> {isInClient ? "Yes" : "No"}</div>
            <div><strong>User Logged In:</strong> {isLoggedIn ? "Yes" : "No"}</div>
        </div>
    );
} 
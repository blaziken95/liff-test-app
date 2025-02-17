"use client";

import { useEffect } from "react";
import DappPortalSdk from "@linenext/dapp-portal-sdk"; // Default import

const DappPortalLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const initializeDappPortal = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
        const chainNodeRpcEndpoint = process.env.NEXT_PUBLIC_RPC_URL;

        if (!clientId) {
          throw new Error("NEXT_PUBLIC_CLIENT_ID is not set in .env.local");
        }

        const sdk = await DappPortalSdk.init({
          clientId,
          chainId: chainId || "", // Provide a default value if optional
          chainNodeRpcEndpoint: chainNodeRpcEndpoint || "", // Provide a default value if optional
          // Add other configuration options as necessary
        });
        console.log("DappPortalSdk initialized successfully");
      } catch (error) {
        console.error("Error initializing DappPortalSdk:", error);
      }
    };

    initializeDappPortal();
  }, []);

  const handleConnectWallet = () => {
    // Logic to connect to the wallet using DappPortalSdk
    console.log("Connect to Wallet button clicked");
    // Example: sdk.connectWallet(); // Uncomment and implement this if the SDK provides such a method
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>Connect to Wallet</button>
      {children}
    </div>
  );
};

export default DappPortalLayout; 
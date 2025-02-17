"use client";

import DappPortalLayout from '@/components/DappPortalLayout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DappPortalSdk from "@linenext/dapp-portal-sdk";
import WalletDetails from '@/components/WalletDetails';
import WalletTypeDetails from '@/components/WalletTypeDetails';

const DappTestPage = () => {
  const router = useRouter();
  const [walletProvider, setWalletProvider] = useState<any>(null);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [rpcResponse, setRpcResponse] = useState<any>(null);

  useEffect(() => {
    const initializeSdk = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
        const chainNodeRpcEndpoint = process.env.NEXT_PUBLIC_RPC_URL;

        if (!clientId) {
          throw new Error("NEXT_PUBLIC_CLIENT_ID is not set in .env.local");
        }

        const sdk = await DappPortalSdk.init({
          clientId,
          chainId: chainId || "",
          chainNodeRpcEndpoint: chainNodeRpcEndpoint || "",
        });

        const provider = sdk.getWalletProvider(); // Replace with actual method if different
        setWalletProvider(provider);
        console.log("DappPortalSdk initialized successfully");
      } catch (error) {
        console.error("Error initializing DappPortalSdk:", error);
      }
    };

    initializeSdk();
  }, []);

  const handleConnectWallet = async () => {
    if (walletProvider) {
      try {
        const accounts = await walletProvider.request({
          method: 'eth_requestAccounts',
        });
        setAccounts(accounts as string[]);
        const type = walletProvider.getWalletType();
        setWalletType(type ? type.toString() : null);
        console.log("Connected accounts:", accounts);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error("WalletProvider not initialized");
    }
  };

  const handleDisconnectWallet = () => {
    if (walletProvider) {
      try {
        walletProvider.disconnectWallet(); // Assuming this method exists
        setAccounts(null);
        setWalletType(null);
        setRpcResponse(null);
        console.log("Wallet disconnected successfully");
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    } else {
      console.error("WalletProvider not initialized");
    }
  };

  const handleKaiaRequestAccounts = async () => {
    if (walletProvider) {
      try {
        const response = await walletProvider.request({
          method: 'kaia_requestAccounts',
        });
        setRpcResponse(response);
        console.log("Kaia Request Accounts response:", response);
      } catch (error) {
        console.error("Error performing kaia_requestAccounts:", error);
      }
    } else {
      console.error("WalletProvider not initialized");
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <DappPortalLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-8 overflow-y-auto">
        <h1 className="text-2xl font-bold">Dapp Test Page</h1>
        <div className="flex w-full max-w-4xl space-x-8">
          <div className="flex-1 space-y-8">
            <WalletDetails accounts={accounts} />
            <WalletTypeDetails walletType={walletType} />
            {rpcResponse && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">kaia_requestAccounts Response</h2>
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  {JSON.stringify(rpcResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleConnectWallet}
              disabled={accounts && accounts.length > 0}
              className={`mt-4 px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                accounts && accounts.length > 0
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              Connect to LINE Wallet
            </button>
            <button 
              onClick={handleDisconnectWallet}
              disabled={!accounts || accounts.length === 0}
              className={`mt-4 px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                !accounts || accounts.length === 0
                  ? 'bg-red-300 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
              }`}
            >
              Disconnect Wallet
            </button>
            <button 
              onClick={handleKaiaRequestAccounts}
              disabled={!accounts || accounts.length === 0}
              className={`mt-4 px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                !accounts || accounts.length === 0
                  ? 'bg-green-300 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              kaia_requestAccounts
            </button>
            <button 
              onClick={handleBack}
              className="mt-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </DappPortalLayout>
  );
};

export default DappTestPage; 
import React from 'react';

interface WalletTypeDetailsProps {
  walletType: string | null;
}

const WalletTypeDetails: React.FC<WalletTypeDetailsProps> = ({ walletType }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Wallet Type</h2>
      {walletType ? (
        <p className="text-green-600">Connected Wallet Type: {walletType}</p>
      ) : (
        <p className="text-red-600">No wallet connected.</p>
      )}
    </div>
  );
};

export default WalletTypeDetails; 
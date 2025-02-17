import React from 'react';

interface WalletDetailsProps {
  accounts: string[] | null;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ accounts }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Wallet Details</h2>
      {accounts ? (
        <div>
          <p className="text-green-600">Wallet is connected.</p>
          <ul className="list-disc list-inside">
            {accounts.map((account, index) => (
              <li key={index} className="text-gray-700">{account}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-600">Wallet is not connected.</p>
      )}
    </div>
  );
};

export default WalletDetails; 
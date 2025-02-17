import React from 'react';

interface UnsupportedBrowserGuideProps {
  guideMessage: string | null;
}

const UnsupportedBrowserGuide: React.FC<UnsupportedBrowserGuideProps> = ({ guideMessage }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Unsupported Browser Guide</h2>
      {guideMessage ? (
        <p className="text-gray-700">{guideMessage}</p>
      ) : (
        <p className="text-red-600">No guide available.</p>
      )}
    </div>
  );
};

export default UnsupportedBrowserGuide; 
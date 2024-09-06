import { useEffect } from 'react';

const ThankYouScreen = ({ resetSurvey }) => {
  useEffect(() => {
    const timer = setTimeout(() => resetSurvey(), 5000);
    return () => clearTimeout(timer);
  }, [resetSurvey]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Thank You for Your Time!</h1>
        <p className="text-lg text-gray-700">We appreciate your feedback.</p>
      </div>
    </div>
  );
};

export default ThankYouScreen;

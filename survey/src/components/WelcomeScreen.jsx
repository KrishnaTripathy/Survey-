

const WelcomeScreen = ({ startSurvey }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 w-md">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Survey</h1>
        <p className="text-lg mb-6">We value your feedback. Please take a moment to share your thoughts with us.</p>
        <button
          onClick={startSurvey}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Start Survey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

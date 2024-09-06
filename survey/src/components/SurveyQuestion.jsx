import { useState } from 'react';

const SurveyQuestion = ({ question, currentStep, totalSteps, handleNext, handlePrevious, handleAnswer, handleSkip }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleAnswer(question.id, option); // Handle answer selection
  };

  const handleNextClick = () => {
    if (selectedOption || currentStep === totalSteps - 1) {
      handleNext(); // Proceed to the next question or submit
    } else {
      alert('Please select an option before proceeding.'); // Show alert if no option is selected
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Question {currentStep + 1} of {totalSteps}</h2>
        <p className="text-lg mb-6 text-center">{question.text}</p>

        {/* Rating Options */}
        <div className="flex space-x-2 mb-6">
          {[...Array(question.scale).keys()].map((_, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index + 1)}
              className={`w-10 h-10 flex items-center justify-center border border-blue-200 rounded-full text-xl ${
                selectedOption === index + 1 ? 'bg-blue-200' : 'hover:bg-blue-100'
              } focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Previous
          </button>
          <button
            onClick={handleSkip}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none"
          >
            Skip
          </button>
          <button
            onClick={handleNextClick}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none"
          >
            {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;

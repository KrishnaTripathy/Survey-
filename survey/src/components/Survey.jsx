import  { useState, useEffect } from 'react';
import axios from 'axios';
import WelcomeScreen from './WelcomeScreen';
import SurveyQuestion from './SurveyQuestion';
import ThankYouScreen from './ThankYouScreen';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-10, how likely are you to recommend us to your friends and family?', type: 'rating', scale: 5 },
  { id: 5, text: 'What could we do to improve our service?', type: 'rating', scale: 5 },
];

const Survey = () => {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Unique ID for the survey (in real applications, this might come from a user/session)
  const surveyId = 'unique-survey-id';

  useEffect(() => {
    // Fetch existing survey data if any
    axios.get(`http://localhost:5000/api/survey/${surveyId}`)
      .then(response => setAnswers(response.data))
      .catch(error => console.error('Error fetching survey data:', error));
  }, []);

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Show thank you screen and then go back to the welcome screen
      setShowThankYou(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswer = (id, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: answer }));
  };

  const handleSkip = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    // Save the answers to the backend
    axios.post(`http://localhost:5000/api/survey/${surveyId}`, answers)
      .then(() => axios.post(`http://localhost:5000/api/survey/${surveyId}/complete`))
      .then(() => {
        setShowThankYou(true);
        // Set a flag for completed survey
        localStorage.setItem('surveyStatus', 'COMPLETED');
      })
      .catch(error => console.error('Error submitting survey:', error));
  };

  const resetSurvey = () => {
    setStep(-1);
    setAnswers({});
    setSurveyCompleted(false);
    setShowThankYou(false);
  };

  if (showThankYou) {
    return <ThankYouScreen resetSurvey={resetSurvey} />;
  }

  if (surveyCompleted) {
    return <ThankYouScreen resetSurvey={resetSurvey} />;
  }

  if (step === -1) {
    return <WelcomeScreen startSurvey={() => setStep(0)} />;
  }

  return (
    <div className="survey-container">
      {step < questions.length ? (
        <SurveyQuestion
          question={questions[step]}
          currentStep={step}
          totalSteps={questions.length}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleAnswer={handleAnswer}
          handleSkip={handleSkip}
        />
      ) : (
        <div>
          <p>All questions answered.</p>
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Submit Survey
          </button>
        </div>
      )}
    </div>
  );
};

export default Survey;

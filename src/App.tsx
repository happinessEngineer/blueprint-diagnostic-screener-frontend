import React, { useState, useEffect } from 'react';
import { UserAnswer, SubmissionData, Screener } from './types';
import ProgressBar from './components/ProgressBar';
import QuestionScreen from './components/QuestionScreen';
import CompletionScreen from './components/CompletionScreen';
import Header from './components/Header';
import { submitAssessment } from './services/api';
import { fetchScreenerConfig } from './services/api';

function App() {
  const [screenerConfig, setScreenerConfig] = useState<Screener | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScreenerConfig = async () => {
      setIsLoading(true);
      try {
        const data = await fetchScreenerConfig();
        setScreenerConfig(data);
      } catch (err) {
        console.error('Error fetching screener data:', err);
        setError('Failed to load screener configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadScreenerConfig();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !screenerConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Failed to load screener configuration'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const section = screenerConfig.content.sections[0];
  const totalQuestions = section.questions.length;
  const currentQuestion = section.questions[currentQuestionIndex];
  const progress = isCompleted ? 100 : (currentQuestionIndex / totalQuestions) * 100;

  const submitAnswers = async (answers: UserAnswer[]) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const submissionData: SubmissionData = {
        answers: answers
      };
      
      const response = await submitAssessment(submissionData);
      console.log('Submission response:', response);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setIsSubmitting(false);
      setError('There was an error submitting your answers. Please try again.');
    }
  };

  const handleAnswer = async (value: number) => {
    const newAnswer: UserAnswer = {
      value,
      question_id: currentQuestion.question_id
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      await submitAnswers(updatedAnswers);
    }
  };

  const handleRetry = () => {
    submitAnswers(userAnswers);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header displayName={screenerConfig.content.display_name} fullName={screenerConfig.full_name} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <ProgressBar progress={progress} />
        
        {!isCompleted ? (
          <QuestionScreen 
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            sectionTitle={section.title}
            answers={section.answers}
            onAnswer={handleAnswer}
          />
        ) : (
          <CompletionScreen 
            isSubmitting={isSubmitting} 
            error={error}
            onRetry={handleRetry}
          />
        )}
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; 2025 Blueprint</p>
      </footer>
    </div>
  );
}

export default App;

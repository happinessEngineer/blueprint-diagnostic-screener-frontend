import { useState, useEffect } from 'react';
import { Screener } from './types';
import ProgressBar from './components/ProgressBar';
import QuestionScreen from './components/QuestionScreen';
import CompletionScreen from './components/CompletionScreen';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchScreenerConfig } from './services/api';
import { useScreenerForm } from './hooks/useScreenerForm';

function App() {
  const [screenerConfig, setScreenerConfig] = useState<Screener | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Call the hook with a default empty screener if screenerConfig is null
  const {
    progress,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    sectionTitle,
    sectionAnswers,
    isCompleted,
    isSubmitting,
    error: submissionError,
    handleAnswer,
    handleRetry,
  } = useScreenerForm({ 
    screenerConfig: screenerConfig || {
      id: '',
      name: '',
      disorder: '',
      content: {
        sections: [{
          type: '',
          title: '',
          answers: [],
          questions: []
        }],
        display_name: ''
      },
      full_name: ''
    } 
  });

  useEffect(() => {
    const loadScreenerConfig = async () => {
      setIsLoading(true);
      try {
        const data = await fetchScreenerConfig();
        setScreenerConfig(data);
      } catch (err) {
        console.error('Error fetching screener data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load screener configuration');
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

  // If there are no questions, show a message
  if (!currentQuestion || totalQuestions === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No questions available in this screener.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header displayName={screenerConfig.content.display_name} fullName={screenerConfig.full_name} />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
          <ProgressBar progress={progress} />
          
          {!isCompleted ? (
            <QuestionScreen 
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              sectionTitle={sectionTitle}
              answers={sectionAnswers}
              onAnswer={handleAnswer}
            />
          ) : (
            <CompletionScreen 
              isSubmitting={isSubmitting} 
              error={submissionError}
              onRetry={handleRetry}
            />
          )}
        </main>
        
        <footer className="py-4 text-center text-sm text-gray-500">
          <p>&copy; 2025 Blueprint</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;

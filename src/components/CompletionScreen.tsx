import React from 'react';

interface CompletionScreenProps {
  isSubmitting: boolean;
  error: string | null;
  onRetry?: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ isSubmitting, error, onRetry }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center transition-all duration-300 animate-fadeIn">
      {isSubmitting ? (
        <div className="py-10">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Submitting your responses</h2>
          <p className="text-gray-600">Please wait while we process your answers...</p>
        </div>
      ) : error ? (
        <div className="py-10">
          <div className="flex justify-center mb-4 text-red-500">
            <i className="bi bi-exclamation-circle text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Submission Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="py-10">
          <div className="flex justify-center mb-4 text-green-500">
            <i className="bi bi-check-circle text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your responses have been submitted successfully.</p>
          <div className="bg-gray-50 p-4 rounded-lg inline-block">
            <p className="text-sm text-gray-500">Your healthcare provider will review your responses and discuss them with you during your next appointment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletionScreen;

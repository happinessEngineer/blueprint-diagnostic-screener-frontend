import React, { useState, useRef, useEffect } from 'react';
import { Question, Answer } from '../types';
import AnswerButton from './AnswerButton';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionTitle: string;
  answers: Answer[];
  onAnswer: (value: number) => void;
}

const delayBetweenQuestions = 300;

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  sectionTitle,
  answers,
  onAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const firstAnswerRef = useRef<HTMLButtonElement>(null);

  // Focus the question when it changes
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [question]);

  // Focus the first answer button when the component mounts
  useEffect(() => {
    if (firstAnswerRef.current) {
      firstAnswerRef.current.focus();
    }
  }, []);

  const handleAnswerClick = (value: number) => {
    setSelectedAnswer(value);
    
    // Add a delay before moving to the next question for better UX
    setTimeout(() => {
      onAnswer(value);
      setSelectedAnswer(null);
    }, delayBetweenQuestions);
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAnswerClick(value);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 animate-fadeIn"
      role="region"
      aria-label={`Question ${questionNumber} of ${totalQuestions}`}
    >
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2" id="question-progress">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-lg font-medium text-gray-700 mb-4">{sectionTitle}</h2>
      </div>
      
      <div className="mb-8">
        <h3 
          className="text-xl font-semibold text-gray-800 mb-6"
          ref={questionRef}
          tabIndex={-1}
          id="question-title"
        >
          {question.title}
        </h3>
        
        <div 
          role="radiogroup" 
          aria-labelledby="question-title"
          aria-describedby="question-progress"
        >
          {answers.map((answer, index) => (
            <AnswerButton
              key={answer.value}
              answer={answer}
              isSelected={selectedAnswer === answer.value}
              onClick={() => handleAnswerClick(answer.value)}
              onKeyDown={(e) => handleKeyDown(e, answer.value)}
              ref={index === 0 ? firstAnswerRef : undefined}
              aria-label={answer.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;

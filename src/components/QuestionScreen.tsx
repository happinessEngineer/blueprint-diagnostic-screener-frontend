import React, { useState } from 'react';
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

  const handleAnswerClick = (value: number) => {
    setSelectedAnswer(value);
    
    // Add a delay before moving to the next question for better UX
    setTimeout(() => {
      onAnswer(value);
      setSelectedAnswer(null);
    }, delayBetweenQuestions);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 animate-fadeIn">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Question {questionNumber} of {totalQuestions}</p>
        <h2 className="text-lg font-medium text-gray-700 mb-4">{sectionTitle}</h2>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.title}</h3>
        
        <div>
          {answers.map((answer) => (
            <AnswerButton
              key={answer.value}
              answer={answer}
              isSelected={selectedAnswer === answer.value}
              onClick={() => handleAnswerClick(answer.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;

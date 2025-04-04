import React from 'react';
import { Answer } from '../types';

interface AnswerButtonProps {
  answer: Answer;
  isSelected: boolean;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, isSelected, onClick }) => {
  return (
    <button
      className={`answer-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <div className="flex items-center">
        <div className={`w-5 h-5 rounded-full border ${isSelected ? 'bg-primary-500 border-primary-500' : 'border-gray-300'} mr-3 flex-shrink-0`}>
          {isSelected && <i className="bi bi-check text-white text-sm flex justify-center"></i>}
        </div>
        <span>{answer.title}</span>
      </div>
    </button>
  );
};

export default AnswerButton;

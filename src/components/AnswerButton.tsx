import React, { forwardRef } from 'react';
import { Answer } from '../types';

interface AnswerButtonProps {
  answer: Answer;
  isSelected: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'aria-label'?: string;
}

const AnswerButton = forwardRef<HTMLButtonElement, AnswerButtonProps>(
  ({ answer, isSelected, onClick, onKeyDown, 'aria-label': ariaLabel }, ref) => {
    return (
      <button
        className={`answer-button ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-pressed={isSelected}
        aria-label={ariaLabel}
        ref={ref}
        role="radio"
      >
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border ${isSelected ? 'bg-primary-500 border-primary-500' : 'border-gray-300'} mr-3 flex-shrink-0`}>
            {isSelected && <i className="bi bi-check text-white text-sm flex justify-center"></i>}
          </div>
          <span>{answer.title}</span>
        </div>
      </button>
    );
  }
);

AnswerButton.displayName = 'AnswerButton';

export default AnswerButton;

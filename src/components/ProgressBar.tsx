import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label = 'Progress' }) => {
  return (
    <div className="mb-8">
      <div 
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="sr-only">
        {label}: {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;

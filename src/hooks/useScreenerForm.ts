import { useState, useCallback } from 'react';
import { Screener, UserAnswer } from '../types';
import { submitAssessment } from '../services/api';

interface UseScreenerFormProps {
  screenerConfig: Screener;
}

interface UseScreenerFormReturn {
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  isCompleted: boolean;
  isSubmitting: boolean;
  error: string | null;
  progress: number;
  currentQuestion: Screener['content']['sections'][0]['questions'][0] | null;
  totalQuestions: number;
  sectionTitle: string;
  sectionAnswers: Screener['content']['sections'][0]['answers'];
  handleAnswer: (value: number) => Promise<void>;
  handleRetry: () => Promise<void>;
}

export const useScreenerForm = ({ screenerConfig }: UseScreenerFormProps): UseScreenerFormReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const section = screenerConfig.content.sections[0];
  const totalQuestions = section.questions.length;
  const currentQuestion = section.questions[currentQuestionIndex] || null;
  const progress = isCompleted ? 100 : (currentQuestionIndex / totalQuestions) * 100;

  const submitAnswers = useCallback(async (answers: UserAnswer[]) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitAssessment({ answers });
      setIsSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your answers');
      setIsSubmitting(false);
    }
  }, []);

  const handleAnswer = useCallback(async (value: number) => {
    if (!currentQuestion) return;
    
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
  }, [currentQuestion, currentQuestionIndex, submitAnswers, totalQuestions, userAnswers]);

  const handleRetry = useCallback(async () => {
    await submitAnswers(userAnswers);
  }, [submitAnswers, userAnswers]);

  return {
    currentQuestionIndex,
    userAnswers,
    isCompleted,
    isSubmitting,
    error,
    progress,
    currentQuestion,
    totalQuestions,
    sectionTitle: section.title,
    sectionAnswers: section.answers,
    handleAnswer,
    handleRetry,
  };
}; 
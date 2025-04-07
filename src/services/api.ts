import axios, { AxiosError } from 'axios';
import { SubmissionData, AssessmentResult, Screener, ApiError } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://blueprint-diagnostic-screener-3373dd544c7a.herokuapp.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ErrorResponse {
  message?: string;
  code?: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      code: error.response.data?.code,
    };
  }
  if (error.request) {
    return {
      message: 'No response received from server',
      code: 'NETWORK_ERROR',
    };
  }
  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

export const submitAssessment = async (data: SubmissionData): Promise<AssessmentResult> => {
  try {
    const response = await api.post<AssessmentResult>('/assessment-submissions', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError<ErrorResponse>);
  }
};

export const fetchScreenerConfig = async (): Promise<Screener> => {
  try {
    const response = await api.get<Screener>('/screener-config');
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError<ErrorResponse>);
  }
};

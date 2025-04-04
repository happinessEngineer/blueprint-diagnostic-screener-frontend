import axios from 'axios';
import { SubmissionData } from '../types';

const API_URL = 'http://localhost:3000';

export const submitAssessment = async (data: SubmissionData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/assessment-submissions`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

export const fetchScreenerConfig = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/screener-config`);
    return response.data;
  } catch (error) {
    console.error('Error fetching screener configuration:', error);
    throw error;
  }
};

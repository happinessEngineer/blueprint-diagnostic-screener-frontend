export interface Answer {
  title: string;
  value: number;
}

export interface Question {
  question_id: string;
  title: string;
}

export interface Section {
  type: string;
  title: string;
  answers: Answer[];
  questions: Question[];
}

export interface Content {
  sections: Section[];
  display_name: string;
}

export interface Screener {
  id: string;
  name: string;
  disorder: string;
  content: Content;
  full_name: string;
}

export interface UserAnswer {
  value: number;
  question_id: string;
}

export interface SubmissionData {
  answers: UserAnswer[];
}

"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface EnneagramContextType {
  questions: Question[];
  answers: Answer[];
  enneagrams: Enneagram[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  submitAnswers: () => Promise<void>;
}

const EnneagramContext = createContext<EnneagramContextType | undefined>(undefined);

export const EnneagramProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [enneagrams, setEnneagrams] = useState<Enneagram[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, enneagramResponse] = await Promise.all([
          axios.get<Question[]>('/api/enneagram/questions'),
          axios.get<Enneagram[]>('/api/enneagram/enneagrams')
        ]);
        setQuestions(questionsResponse.data);
        setEnneagrams(enneagramResponse.data);
      } catch (error) {
        console.error('질문지를 불러오는 데 실패했습니다:', error);
        setQuestions([]);
        setEnneagrams([]);
      }
    };
    fetchData();
  }, []);

  const submitAnswers = async () => {
    try {
      const { data } = await axios.post('/api/enneagram/submit', { answers });
      console.log('Answers submitted successfully', data);
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  return (
    <EnneagramContext.Provider value={{ questions, answers, enneagrams, setAnswers, submitAnswers }}>
      {children}
    </EnneagramContext.Provider>
  );
};

export function useEnneagram(): EnneagramContextType {
  const context = useContext(EnneagramContext);
  if (!context) {
    throw new Error("useEnneagram must be used within an EnneagramProvider");
  }
  return context;
}
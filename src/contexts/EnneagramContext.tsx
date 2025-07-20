"use client";

import axios from "axios";
import { ReactNode, use, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface EnneagramContextType {
  questions: Question[];
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

const EnneagramContext = createContext<EnneagramContextType | undefined>(undefined);

export const EnneagramProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>('/api/enneagram/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('질문지를 불러오는 데 실패했습니다:', error);
        setQuestions([]); // 초기화하여 빈 배열로 설정
      }
    };
    fetchQuestions();
  }, []);

  return (
    <EnneagramContext.Provider value={{ questions, answers, setAnswers }}>
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
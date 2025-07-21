"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { chunkArray } from "@/libs/util";

interface EnneagramContextType {
  questions: Question[];
  answers: Answer[];
  enneagrams: Enneagram[];
  questionPage: Question[][];
  setQuestionPage: React.Dispatch<React.SetStateAction<Question[][]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  submitAnswers: () => Promise<void>;
}

const EnneagramContext = createContext<EnneagramContextType | undefined>(undefined);

export const EnneagramProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [enneagrams, setEnneagrams] = useState<Enneagram[]>([]);
  const [questionPage, setQuestionPage] = useState<Question[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsResponse, enneagramResponse] = await Promise.all([
          axios.get<Question[]>('/api/enneagram/questions'),
          axios.get<Enneagram[]>('/api/enneagram/enneagrams')
        ]);
        const questions = questionsResponse.data;
        const enneagrams = enneagramResponse.data;
        setQuestions(questions);
        setEnneagrams(enneagrams);

        const chunkedQuestions = chunkArray(questions, 8);
        setQuestionPage(chunkedQuestions);
        setCurrentPage(0);
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
      return data.type;
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  return (
    <EnneagramContext.Provider value={{
      questions,
      answers,
      enneagrams,
      questionPage,
      setQuestionPage,
      currentPage,
      setCurrentPage,
      setAnswers,
      submitAnswers
    }}>
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
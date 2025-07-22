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
  submitAnswers: () => Promise<string>;
}

const EnneagramContext = createContext<EnneagramContextType | undefined>(undefined);

export const EnneagramProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [enneagrams, setEnneagrams] = useState<Enneagram[]>([]);
  const [questionPage, setQuestionPage] = useState<Question[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    /**
     * 질문지와 에니어그램 유형 정보를 서버에서 가져와서 상태를 초기화합니다.
     * 질문지는 8개씩 묶어서 페이지로 나누고, 현재 페이지을 0으로 설정합니다.
     * 에러가 발생하면 빈 배열로 초기화합니다.
     */
    const fetchData = async (): Promise<void> => {
      try {
        const [questionsResponse, enneagramResponse] = await Promise.all([
          axios.get<Question[]>("/api/enneagram/questions"),
          axios.get<Enneagram[]>("/api/enneagram/enneagrams")
        ]);
        const questions = questionsResponse.data;
        const enneagrams = enneagramResponse.data;
        setQuestions(questions);
        setEnneagrams(enneagrams);

        const chunkedQuestions = chunkArray(questions, 8);
        setQuestionPage(chunkedQuestions);
        setCurrentPage(0);
      } catch (error) {
        console.error("질문지를 불러오는 데 실패했습니다:", error);
        setQuestions([]);
        setEnneagrams([]);
      }
    };
    fetchData();
  }, []);

  /**
   * 답변을 제출하고 결과를 반환합니다.
   * @returns {Promise<string>} - 제출된 답변에 대한 에니어그램 유형
   */
  const submitAnswers = async (): Promise<string> => {
    try {
      const { data } = await axios.post("/api/enneagram/submit", { answers });
      return data.type;
    } catch (error) {
      console.error("답변을 제출하는 데 실패했습니다:", error);
      return "";
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
    throw new Error("useEnneagra은 EnneagramProvider 내에서만 사용할 수 있습니다.");
  }
  return context;
}
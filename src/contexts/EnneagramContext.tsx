"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { chunkArray } from "@/lib/array-utils";
import {
  DRAFT_STORAGE_KEY,
  SCORES_STORAGE_KEY,
  WING_STORAGE_KEY,
} from "@/constants/storage-keys";

interface EnneagramContextType {
  questions: Question[];
  answers: Answer[];
  primaryTypes: PrimaryType[];
  wingAnalysis: WingAnalysisItem[];
  questionPage: Question[][];
  setQuestionPage: React.Dispatch<React.SetStateAction<Question[][]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  submitAnswers: () => Promise<string>;
}

const EnneagramContext = createContext<EnneagramContextType | undefined>(undefined);

function loadDraft(): { answers: Answer[]; currentPage: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { answers: Answer[]; currentPage: number };
    if (!Array.isArray(parsed.answers) || typeof parsed.currentPage !== "number")
      return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveDraft(answers: Answer[], currentPage: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ answers, currentPage })
    );
  } catch {
    // ignore
  }
}

function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const EnneagramProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [primaryTypes, setPrimaryTypes] = useState<PrimaryType[]>([]);
  const [wingAnalysis, setWingAnalysis] = useState<WingAnalysisItem[]>([]);
  const [questionPage, setQuestionPage] = useState<Question[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const [questionsResponse, primaryResponse, wingResponse] =
          await Promise.all([
            axios.get<Question[]>("/api/enneagram/questions"),
            axios.get<PrimaryType[]>("/api/enneagram/primary-types"),
            axios.get<WingAnalysisItem[]>("/api/enneagram/wing-analysis")
          ]);
        const questions = questionsResponse.data;
        setQuestions(questions);
        setPrimaryTypes(primaryResponse.data);
        setWingAnalysis(wingResponse.data);

        const chunkedQuestions = chunkArray(questions, 8);
        setQuestionPage(chunkedQuestions);

        const draft = loadDraft();
        if (draft && draft.answers.length > 0) {
          const maxPage = Math.min(
            draft.currentPage,
            chunkedQuestions.length - 1
          );
          setAnswers(draft.answers);
          setCurrentPage(maxPage);
        } else {
          setCurrentPage(0);
        }
      } catch (error) {
        console.error("질문지를 불러오는 데 실패했습니다:", error);
        setQuestions([]);
        setPrimaryTypes([]);
        setWingAnalysis([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (questionPage.length > 0 && answers.length > 0) {
      saveDraft(answers, currentPage);
    }
  }, [answers, currentPage, questionPage.length]);

  const submitAnswers = async (): Promise<string> => {
    try {
      const { data } = await axios.post("/api/enneagram/submit", { answers });
      clearDraft();
      try {
        if (data.scores) {
          sessionStorage.setItem(
            SCORES_STORAGE_KEY,
            JSON.stringify(data.scores)
          );
        }
        if (data.wing != null) {
          sessionStorage.setItem(WING_STORAGE_KEY, String(data.wing));
        } else {
          sessionStorage.removeItem(WING_STORAGE_KEY);
        }
      } catch {
        // ignore
      }
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
      primaryTypes,
      wingAnalysis,
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
    throw new Error("useEnneagram은 EnneagramProvider 내에서만 사용할 수 있습니다.");
  }
  return context;
}
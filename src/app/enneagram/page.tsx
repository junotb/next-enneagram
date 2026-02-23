"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import QuestionList from "@/components/enneagram/QuestionList";
import AssessmentProgress from "@/components/enneagram/AssessmentProgress";
import Loader from "@/components/Loader";
import { useEnneagram } from "@/contexts/EnneagramContext";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";
import { useToast } from "@/hooks/useToast";

const BUTTON_CLASS =
  "bg-theme-primary text-white font-semibold shadow-lg enabled:hover:opacity-90 enabled:hover:border-theme-secondary enabled:hover:shadow-xl enabled:hover:scale-[1.02] transition-all duration-200 border-2 border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/50 disabled:bg-theme-surface disabled:text-theme-text-muted disabled:border-theme-text-muted/40 disabled:cursor-not-allowed w-full";

const AUTO_ADVANCE_DELAY_MS = 400;

export default function Page() {
  const { questionPage, currentPage, answers, setCurrentPage, submitAnswers } =
    useEnneagram();
  const { type } = useEnneagramTheme();
  const { showToast, Toast } = useToast();
  const router = useRouter();
  const footerRef = useRef<HTMLDivElement>(null);
  const prevAllAnsweredRef = useRef(false);
  const isInitialMount = useRef(true);

  const totalPages = questionPage?.length ?? 0;
  const currentQuestions = questionPage[currentPage] ?? [];
  const currentAnswers = new Set(answers.map((a) => a.seq));
  const allAnswered = currentQuestions.every((q) => currentAnswers.has(q.seq));

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevAllAnsweredRef.current = allAnswered;
      return;
    }
  }, [allAnswered]);

  useEffect(() => {
    if (type !== null) {
      router.replace("/");
    }
  }, [type, router]);

  useEffect(() => {
    if (isInitialMount.current) return;
    if (
      allAnswered &&
      !prevAllAnsweredRef.current &&
      currentPage < totalPages - 1
    ) {
      const id = setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: "smooth" });
        setCurrentPage((p) => p + 1);
      }, AUTO_ADVANCE_DELAY_MS);
      prevAllAnsweredRef.current = true;
      return () => clearTimeout(id);
    }
    prevAllAnsweredRef.current = allAnswered;
  }, [allAnswered, currentPage, totalPages, setCurrentPage]);

  const handleSubmit = async () => {
    try {
      const resultType = await submitAnswers();
      if (!resultType) {
        showToast("답변 제출에 실패했습니다.");
        return;
      }
      router.push(`/enneagram/${resultType}`);
    } catch (error) {
      console.error("답변 제출 중 오류 발생:", error);
      showToast("답변 제출 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    if (!allAnswered) {
      showToast("모든 질문에 답변해주세요.");
      return;
    }
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(currentPage + 1);
  };

  if (type !== null) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-theme-background transition-colors duration-500">
      <main className="relative flex flex-col flex-grow w-full min-h-screen">
        {questionPage?.length === 0 ? (
          <div className="flex flex-grow items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="px-6 sm:px-8 pb-24 w-full min-w-xs max-w-lg mx-auto flex flex-col flex-grow">
              <div className="sticky top-0 pt-6 pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 bg-theme-background/95 backdrop-blur-sm z-10">
                <AssessmentProgress
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
              <div className="space-y-6 pt-2">
                <QuestionList questions={currentQuestions} />
              </div>
            </div>

            <div
              ref={footerRef}
              className="sticky bottom-0 left-0 right-0 p-4 bg-theme-background border-t border-theme-primary/20 z-10"
            >
              <div className="max-w-lg mx-auto">
                {currentPage < totalPages - 1 ? (
                  <Button
                    type="button"
                    fullWidth
                    size="lg"
                    radius="lg"
                    variant="solid"
                    isDisabled={!allAnswered}
                    className={BUTTON_CLASS}
                    onClick={handleNext}
                  >
                    {allAnswered ? "다음 질문" : "문항을 체크해주세요"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    fullWidth
                    size="lg"
                    radius="lg"
                    variant="solid"
                    isDisabled={!allAnswered}
                    className={BUTTON_CLASS}
                    onClick={handleSubmit}
                  >
                    {allAnswered ? "결과 제출" : "문항을 체크해주세요"}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
        {Toast}
      </main>
    </div>
  );
}

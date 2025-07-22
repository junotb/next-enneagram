"use client";

import { useRouter } from "next/navigation";
import QuestionList from "@/components/enneagram/QuestionList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useEnneagram } from "@/contexts/EnneagramContext";
import { useToast } from "@/hooks/useToast";

export default function Page() {
  const { questionPage, currentPage, answers, setCurrentPage, submitAnswers } = useEnneagram();
  const { showToast, Toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const type = await submitAnswers();
      if (!type) {
        showToast("답변 제출에 실패했습니다.");
        return;
      }
      router.push(`/enneagram/${type}`);
    } catch (error) {
      console.error("답변 제출 중 오류 발생:", error);
      showToast("답변 제출 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    const currentQuestions = questionPage[currentPage];
    const currentAnswers = new Set(answers.map(answer => answer.seq));
    const allAnswered = currentQuestions.every(question => currentAnswers.has(question.seq));
    if (!allAnswered) {
      showToast("모든 질문에 답변해주세요.");
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="relative flex flex-col flex-grow pt-16 pb-12 w-full h-full items-center">
        {questionPage?.length === 0
          ? <Loader />
          : <div className="px-8 pb-16 w-full min-w-xs max-w-lg mx-auto space-y-4">
              <QuestionList questions={questionPage[currentPage]} />
              {currentPage < questionPage.length - 1
                ? (
                <button
                    type="button"
                    className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 hover:bg-gray-600 text-white rounded shadow-xl"
                    onClick={handleNext}
                  >
                    다음 질문
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 hover:bg-gray-600 text-white rounded shadow-xl"
                    onClick={handleSubmit}
                  >
                    결과 제출
                  </button>
                )
              }
            </div>
        }
        {Toast}
      </main>
      <Footer />
    </div>
  );
}
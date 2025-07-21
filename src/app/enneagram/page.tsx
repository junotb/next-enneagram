"use client";

import { useRouter } from "next/navigation";
import QuestionList from "@/components/enneagram/QuestionList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useEnneagram } from "@/contexts/EnneagramContext";

export default function Page() {
  const { questionPage, currentPage, setCurrentPage, submitAnswers } = useEnneagram();
  const router = useRouter();

  const handleSubmit = async () => {
    const type = await submitAnswers();
    router.push(`/enneagram/${type}`);
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
                    className="border border-gray-400 w-full h-12 bg-white rounded shadow-xl"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    다음 질문
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="border border-gray-400 w-full h-12 bg-white rounded shadow-xl"
                    onClick={handleSubmit}
                  >
                    결과 제출
                  </button>
                )
              }
            </div>
        }
      </main>
      <Footer />
    </div>
  );
}
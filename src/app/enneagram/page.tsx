"use client";

import QuestionList from "@/components/enneagram/QuestionList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useEnneagram } from "@/contexts/EnneagramContext";

export default function Page() {
  const { questions, submitAnswers } = useEnneagram();

  const handleClick = async () => {
    // Handle the submission of answers here
    await submitAnswers();
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="relative flex flex-col flex-grow pt-16 pb-12 w-full h-full items-center">
        {questions?.length === 0
          ? <Loader />
          : <div className="px-8 pb-16 w-full min-w-xs max-w-lg mx-auto space-y-4">
              <QuestionList questions={questions} />
              <button
                type="button"
                className="border border-gray-400 w-full h-12 bg-white rounded shadow-xl"
                onClick={handleClick}
              >
                Submit Answers
              </button>
            </div>
        }
      </main>
      <Footer />
    </div>
  );
}
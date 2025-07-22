"use client";

import { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import EnneagramCard from "@/components/enneagram/EnneagramCard";
import { useEnneagram } from "@/contexts/EnneagramContext";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { type } = use(params);
  const { enneagrams } = useEnneagram();
  const [enneagram, setEnneagram] = useState<Enneagram | null>(null);

  useEffect(() => {
    if (!enneagrams || enneagrams.length === 0) return;
    setEnneagram(enneagrams.find(enneagram => enneagram.type === parseInt(type)) || null);
  }, [enneagrams, type]);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="relative flex flex-col flex-grow pt-16 pb-12 w-full h-full items-center">
        <div className="flex flex-col justify-center items-center w-full h-full">
          {enneagram
            ? (
              <>
                <EnneagramCard enneagram={enneagram} />
                <div className="mt-8 space-y-4 text-center">
                  <p>즐거우셨나요? 더 많은 정보를 원하시면 아래 링크를 확인해보세요!</p>
                  <div className="flex justify-center gap-4">
                    <Link href="/enneagram" className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 hover:bg-gray-600 text-white rounded shadow-xl">다시하기</Link>
                    <Link href="http://www.ieakorea.com/index/" className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 hover:bg-gray-600 text-white rounded shadow-xl">다른 유형 보기</Link>
                  </div>
                </div>
              </>
            )
            : <Loader />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
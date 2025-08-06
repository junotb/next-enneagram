"use client";

import { use, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import EnneagramTypeCard from "@/components/enneagram/EnneagramTypeCard";
import { useEnneagram } from "@/contexts/EnneagramContext";
import Link from "next/link";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget";
import EnneagramWingCard from "@/components/enneagram/EnneagramWingCard";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { type } = use(params);
  const { enneagrams } = useEnneagram();
  const [enneagram, setEnneagram] = useState<Enneagram | null>(null);
  const [leftWing, setLeftWing] = useState<EnneagramWing | null>(null);
  const [rightWing, setRightWing] = useState<EnneagramWing | null>(null);

  useEffect(() => {
    if (!enneagrams || enneagrams.length === 0) return;

    const parsedType = parseInt(type, 10);
    const myEnneagram = enneagrams.find(enneagram => enneagram.type === parsedType);
    if (!myEnneagram) return;

    setEnneagram(myEnneagram);
    const [leftWing, rightWing] = myEnneagram.wings;
    setLeftWing(leftWing);
    setRightWing(rightWing);
  }, [type, enneagrams]);

  const isLoading = !enneagram || !leftWing || !rightWing;
  if (isLoading) return <Loader />;

  return (
    <div className="md:flex md:flex-col md:justify-between md:items-center w-full h-full overflow-y-auto">
      {/* 웹용 에니어그램 카드 */}
      <div className="hidden md:flex justify-center items-center gap-4 w-full h-full">
        <EnneagramWingCard wing={leftWing} />
        <EnneagramTypeCard enneagram={enneagram} />
        <EnneagramWingCard wing={rightWing} />
      </div>

      {/* 모바일용 에니어그램 카드 */}
      <div className="md:hidden">
        <EnneagramTypeCard enneagram={enneagram} />
        <EnneagramWingCard wing={leftWing} />
        <EnneagramWingCard wing={rightWing} />
      </div>

      <div className="px-8 py-4 space-y-4 text-center">
        <p className="text-sm md:text-base">즐거우셨나요? 더 많은 정보를 원하시면 아래 링크를 확인해보세요!</p>
        <div className="flex justify-center gap-4">
          <Link href="/enneagram" className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 active:bg-gray-600 hover:bg-gray-600 text-white rounded-lg shadow-xl">다시하기</Link>
          <Link href="http://www.ieakorea.com/index/" className="px-4 py-2 w-full h-12 leading-9 bg-gray-500 active:bg-gray-600 hover:bg-gray-600 text-white rounded-lg shadow-xl">다른 유형 보기</Link>
        </div>
        <div className="pt-4">
          <BuyMeACoffeeWidget />
        </div>
      </div>
    </div>
  );
}
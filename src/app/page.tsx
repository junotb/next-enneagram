import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget";

export default function Home() {
  return (
    <div className="font-sans flex flex-col w-full h-full">
      <Header />
      <main className="relative flex flex-col flex-grow items-center pt-16 pb-12 w-full h-full space-y-4 overflow-y-auto">
        <div className="flex flex-col justify-center items-center px-4 w-full h-full min-w-xs max-w-lg space-y-4">
          <h2 className="text-2xl font-bold mb-4">에니어그램이란?</h2>
          <p className="text-gray-700">
            에니어그램은 아홉 가지 성격 유형과 그 상호 관계를 설명하는 인간 심리학 모델입니다. 개인 개발, 자기 인식 및 타인 이해를 위해 사용됩니다.
          </p>
          <div className="mt-4 text-right">
            <Link href="/enneagram" className="px-4 py-2 bg-gray-500 active:bg-gray-600 hover:bg-gray-600 text-white rounded-lg shadow-xl">
              에니어그램 테스트 시작하기
            </Link>
          </div>
        </div>
        <BuyMeACoffeeWidget />
      </main>
      <Footer />
    </div>
  );
}

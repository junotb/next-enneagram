import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center px-8 w-full h-16 bg-white text-center z-10">
      <div className="flex space-x-4">
        <h1 className="leading-16 text-3xl font-bold">Next Enneagram</h1>
        <p className="leading-16 text-sm text-gray-600">당신의 성격 유형을 알아보세요</p>
      </div>
      <nav className="flex space-x-4">
        <Link href="/" className="text-gray-500 hover:text-gray-600 font-semibold hover:underline">홈</Link>
        <Link href="/enneagram" className="text-gray-500 hover:text-gray-600 font-semibold hover:underline">에니어그램 테스트</Link>
      </nav>
    </header>
  );
}
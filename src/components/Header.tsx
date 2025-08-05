"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 flex justify-between items-center px-4 w-full h-16 bg-white text-center z-10">
      {/* 웹용 네비게이션 */}
      <div className="hidden md:flex space-x-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="leading-16 text-2xl font-bold"
          aria-label="홈"
        >
          Next Enneagram
        </Link>
        <p className="leading-16 text-sm text-gray-600">당신의 성격 유형을 알아보세요</p>
      </div>
      <nav className="hidden md:flex space-x-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-gray-500 active:bg-gray-600 hover:bg-gray-600 font-semibold active:underline hover:underline"
          aria-label="홈"
        >
          홈
        </Link>
        <Link
          href="/enneagram"
          onClick={closeMenu}
          className="text-gray-500 active:bg-gray-600 hover:bg-gray-600 font-semibold active:underline hover:underline"
          aria-label="에니어그램 테스트"
        >
          에니어그램 테스트
        </Link>
      </nav>

      {/* 모바일용 네비게이션 */}
      <div className="flex md:hidden items-center">
        <Link
          href="/"
          onClick={closeMenu}
          className="leading-16 text-3xl font-bold"
          aria-label="홈"
        >
          Next Enneagram
        </Link>
      </div>
      <button
        type="button"
        onClick={toggleMenu}
        className="md:hidden text-gray-500 active:bg-gray-600 hover:bg-gray-600 focus:outline-none"
        aria-label="메뉴 열기"
        aria-expanded={isMenuOpen}
      >
        <Image src="/bars-3.svg" alt="Menu" width={24} height={24} />
      </button>
      <nav className={clsx("absolute top-16 right-0 flex flex-col justify-center items-center w-full bg-white shadow-xl transition-all duration-300 ease-in-out", {
        "opacity-100": isMenuOpen,
        "opacity-0 pointer-events-none": !isMenuOpen
      })}>
        <Link
          href="/"
          onClick={closeMenu}
          className="py-2 text-gray-500 active:bg-gray-600 hover:bg-gray-600 font-semibold active:underline hover:underline"
          aria-label="홈"
        >
          홈
        </Link>
        <Link
          href="/enneagram"
          onClick={closeMenu}
          className="py-2 text-gray-500 active:bg-gray-600 hover:bg-gray-600 font-semibold active:underline hover:underline"
          aria-label="에니어그램 테스트"
        >
          에니어그램 테스트
        </Link>
      </nav>
    </header>
  );
}
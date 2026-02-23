"use client";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-theme-background transition-colors duration-500">
      <svg
        viewBox="0 0 24 24"
        className="w-12 h-12 text-theme-primary animate-spin"
        aria-label="Loading"
      >
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3.66663V6.99996" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 17V20.3333" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6.1084 6.10828L8.46673 8.46661" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.5334 15.5333L17.8918 17.8917" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3.66675 12H7.00008" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 12H20.3333" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6.1084 17.8917L8.46673 15.5333" />
        <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.5334 8.46661L17.8918 6.10828" />
      </svg>
    </div>
  );
}
"use client";

import { LIKERT_OPTIONS } from "@/constants/assessment";

interface AnswerListProps {
  seq: number;
  value: string;
  onChange: (seq: number, answer: number) => void;
}

export default function AnswerList({ seq, value, onChange }: AnswerListProps) {
  const name = `answer-${seq}`;

  return (
    <div
      role="radiogroup"
      aria-label="답변 선택 (리커트 척도)"
      className="grid grid-cols-5 gap-2 sm:gap-3"
    >
      {LIKERT_OPTIONS.map((opt) => {
        const isChecked = value === String(opt.value);
        return (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`
              relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl
              border-2 cursor-pointer touch-manipulation
              transition-all duration-200 min-h-[72px] sm:min-h-[80px]
              ${isChecked
                ? "border-theme-primary bg-theme-primary/15 shadow-md scale-[1.02]"
                : "border-theme-text-muted/30 hover:border-theme-primary/50 hover:bg-theme-surface"}
            `}
          >
            <input
              id={`${name}-${opt.value}`}
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange(seq, opt.value)}
              className="sr-only"
            />
            <span
              className={`
                rounded-full shrink-0 border-2 transition-all duration-200
                ${isChecked
                  ? "border-theme-primary bg-theme-primary"
                  : "border-theme-text-muted/50 bg-transparent"}
              `}
              style={{
                width: `${24 * opt.scale}px`,
                height: `${24 * opt.scale}px`,
              }}
            />
            <span
              className={`text-[10px] sm:text-xs text-center leading-tight ${
                isChecked ? "text-theme-primary font-semibold" : "text-theme-text-muted"
              }`}
            >
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function useToast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };

  const Toast = mounted && visible
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          aria-live="polite"
          role="alert"
        >
          {/* 전체 화면 덮는 반투명 오버레이 */}
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden
          />
          {/* 토스트 카드 - 테마 색상 적용 */}
          <div className="relative bg-theme-surface border border-theme-primary/30 text-theme-text px-5 py-3 rounded-xl shadow-2xl max-w-[90vw] transition-colors duration-500">
            {message}
          </div>
        </div>,
        document.body
      )
    : null;

  return { showToast, Toast };
}

import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };

  const Toast = visible
    ? (
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
        <div className="border border-gray-600 px-4 py-2 bg-white text-gray-600 rounded-lg shadow-xl z-50">
          {message}
        </div>
      </div>
    )
    : null;

  return { showToast, Toast };
}

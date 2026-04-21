"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PointsModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="
          points-scrollbar
          relative z-10
          w-[min(980px,94vw)]
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border border-neutral-700
          bg-neutral-950
          p-4 md:p-6
          shadow-2xl
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl leading-none text-neutral-400 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
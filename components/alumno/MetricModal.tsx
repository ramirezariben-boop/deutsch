"use client";

export default function MetricModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="
          relative z-10
          w-full
          max-w-6xl
          max-h-[90vh]
          rounded-xl
          bg-neutral-900
          border border-neutral-700
          p-6
          flex flex-col
          overflow-y-auto
          animate-scale-in
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
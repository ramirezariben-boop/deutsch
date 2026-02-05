// components/alumno/MetricModal.tsx
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
      {/* fondo blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* contenido */}
<div
  className="
    relative z-10
    w-[720px]
    max-h-[80vh]
    rounded-xl
    bg-neutral-900
    border border-neutral-700
    p-6
    flex flex-col 
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

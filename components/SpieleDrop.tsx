"use client";
import { useState, useEffect, useRef } from "react";

export function SpieleDrop() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-56" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
      >
        🎮 Spiele 🕹️
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-56 flex flex-col gap-px z-10 rounded overflow-hidden shadow-xl">
          <a
            href="https://lyrickahoot.ariiben.com/game/player.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-center"
          >
            🎶 Lyrickahoot! 🧩
          </a>

          <div className="group px-6 py-2 bg-slate-800 text-slate-500 text-center cursor-not-allowed select-none opacity-50 shadow-inner">
            <span className="group-hover:hidden">Trivia</span>
            <span className="hidden group-hover:inline">🚫 Trivia</span>
          </div>

          <div className="px-6 py-2 bg-slate-800 text-slate-500 text-center cursor-not-allowed select-none opacity-50 shadow-inner">
            próximamente...
          </div>
        </div>
      )}
    </div>
  );
}

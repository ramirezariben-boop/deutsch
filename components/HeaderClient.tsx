"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";

export default function HeaderClient({ loggedIn }) {
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();

  // 🚨 Ocultar header en writing
  if (pathname.startsWith("/writing")) {
    return null;
  }

  return (
    <>
      <header className="flex justify-end items-center px-6 py-4 border-b border-gray-800 bg-black/90">
        {loggedIn ? (
          <button
            onClick={async () => {
              await fetch("/api/logout", { method: "POST" });
              window.location.href = "/";
            }}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Abmelden
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Login
          </button>
        )}
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
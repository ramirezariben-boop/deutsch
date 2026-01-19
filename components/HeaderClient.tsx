"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";

export default function HeaderClient({ loggedIn }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="flex justify-end items-center px-6 py-4 border-b border-gray-800 bg-black/90">
        {loggedIn ? (
          <form action="/api/logout" method="POST">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
              Abmelden
            </button>
          </form>
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

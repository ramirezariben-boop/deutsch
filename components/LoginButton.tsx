"use client";

import { useEffect, useState } from "react";

function hasValidSession() {
  const c = document.cookie
    .split("; ")
    .find((x) => x.startsWith("session="));

  const value = c?.split("=")[1]?.trim();

  return !!value;
}

export default function LoginButton() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(hasValidSession());
  }, []);

  if (logged) {
    return (
      <form action="/api/logout" method="POST">
        <button className="bg-red-600 px-4 py-2 rounded-lg">
          Abmelden
        </button>
      </form>
    );
  }

  return (
    <a
      href="/schueler"
      className="bg-blue-600 px-4 py-2 rounded-lg text-white"
    >
      Login
    </a>
  );
}
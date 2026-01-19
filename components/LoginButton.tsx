"use client";

import { useEffect, useState } from "react";

export default function LoginButton() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const has = document.cookie.includes("session=");
    setLogged(has);
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

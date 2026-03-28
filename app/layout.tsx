import "@/app/globals.css";
import HeaderClient from "@/components/HeaderClient";
import { readSessionFromHeaders } from "@/lib/auth";

export const metadata = {
  title: "Deutsch mit AriiBen",
};

export default async function RootLayout({ children }) {
  const session = await readSessionFromHeaders();
  const loggedIn = !!session;

  return (
    <html lang="de">
      <body className="bg-black text-white">
        <HeaderClient loggedIn={loggedIn} />
        <main>{children}</main>
      </body>
    </html>
  );
}
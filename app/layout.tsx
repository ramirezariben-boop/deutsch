import "./globals.css";
import { cookies } from "next/headers";
import HeaderClient from "@/components/HeaderClient";

export const metadata = {
  title: "Deutsch mit AriiBen",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const loggedIn = !!session?.value;

  return (
    <html lang="de">
      <body className="bg-black text-white">
        {/* El header cliente se encarga de los botones y el login modal */}
        <HeaderClient loggedIn={loggedIn} />

        <main>{children}</main>
      </body>
    </html>
  );
}

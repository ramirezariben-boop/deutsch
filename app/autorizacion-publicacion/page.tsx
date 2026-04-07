import { Suspense } from "react";
import AutorizacionClient from "./AutorizacionClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">Cargando...</p>}>
      <AutorizacionClient />
    </Suspense>
  );
}
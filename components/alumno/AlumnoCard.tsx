"use client";

import type { ResolvedStudentLevel } from "@/lib/levels/studentLevel";
import AlumnoLevelBadge from "./AlumnoLevelBadge";
import AlumnoLevelStatic from "./AlumnoLevelStatic";


import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from "react";
import AlumnoTabs from "./AlumnoTabs";

type Alumno = {
  id: number | string;
  name: string;

  points?: number | null;
  isCurrent?: boolean;
  listNumber?: number | null;

  course?: string | null;
  nivelActual?: string | null;
  day?: "SAM" | "SON" | "PRIV" | null;

  courseId?: string | null;
  resolvedCourseId?: string | null;

  privCode?: string | null;
  resolvedLevel?: ResolvedStudentLevel | null;
};

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function getImageStorageKey(alumnoId: number | string) {
  return `alumno_card_image_${alumnoId}`;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo procesar la imagen."));
    img.src = src;
  });
}

async function resizeAndCompressImage(
  file: File,
  maxSide = 420,
  quality = 0.82
): Promise<string> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("Solo se permiten imágenes PNG, JPEG o WEBP.");
  }

  const src = await readFileAsDataURL(file);
  const img = await loadImage(src);

  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo crear el canvas.");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/webp", quality);
}

function formatCourseLabel(course?: string | null) {
  if (!course) return "—";

  const m = course.match(/^(basico|intermedio|avanzado)_(\d+)$/i);
  if (!m) return course;

  const [, nivel, numero] = m;

  const nivelMap: Record<string, string> = {
    basico: "Básico",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

  return `${nivelMap[nivel.toLowerCase()] ?? nivel} ${numero}`;
}

export default function AlumnoCard({
  alumno,
  onMinimize,
}: {
  alumno: Alumno;
  onMinimize?: () => void;
}) {
  const isCurrent = alumno.isCurrent === true;
  const courseId = alumno.resolvedCourseId ?? alumno.courseId ?? null;

  const inputRef = useRef<HTMLInputElement>(null);

  const [customImage, setCustomImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(getImageStorageKey(alumno.id));
      setCustomImage(saved);
    } catch {
      setCustomImage(null);
    }
  }, [alumno.id]);

  async function handleFile(file: File | null | undefined) {
    if (!file) return;

    setImageError(null);
    setIsSavingImage(true);

    try {
      const processed = await resizeAndCompressImage(file);
      window.localStorage.setItem(getImageStorageKey(alumno.id), processed);
      setCustomImage(processed);
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        setImageError("La imagen sigue pesando demasiado para guardarse localmente.");
      } else if (error instanceof Error) {
        setImageError(error.message);
      } else {
        setImageError("No se pudo guardar la imagen.");
      }
    } finally {
      setIsSavingImage(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    void handleFile(file);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function onDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    void handleFile(file);
  }

  function removeImage(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      window.localStorage.removeItem(getImageStorageKey(alumno.id));
    } catch {}
    setCustomImage(null);
    setImageError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

return (
  <div className="w-[420px] max-w-[95vw] rounded-xl bg-neutral-900 border border-neutral-700 p-6 shadow-xl relative">
    {onMinimize && (
      <button
        onClick={onMinimize}
        title="Minimizar"
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded text-neutral-700 hover:text-neutral-400 hover:bg-neutral-800 transition-colors text-sm leading-none"
      >
        &#8722;
      </button>
    )}
    <input
      ref={inputRef}
      type="file"
      accept="image/png,image/jpeg,image/webp"
      className="hidden"
      onChange={onInputChange}
    />

    {/* Título a todo el ancho */}
    <h2 className="text-[20px] sm:text-[22px] font-semibold leading-[1.08] mb-6 break-words">
      {alumno.name}
    </h2>

    {/* Cuerpo: datos + imagen */}
    <div className="grid grid-cols-[1fr_150px] gap-5 items-start mb-5">
      <div className="space-y-1 text-sm text-neutral-300 min-w-0">
        <div>
          <span className="text-neutral-500">ID:</span> {alumno.id}
        </div>

        <div>
          <span className="text-neutral-500">MXP:</span>{" "}
          {alumno.points == null ? "—" : Number(alumno.points).toFixed(2)}
        </div>

        <div>
          <span className="text-neutral-500">Vigente:</span> {isCurrent ? "Sí" : "No"}
        </div>

        {isCurrent && (
          <>
            <div>
              <span className="text-neutral-500">Número de lista:</span>{" "}
              {alumno.listNumber ?? "—"}
            </div>

            <div>
              <span className="text-neutral-500">Curso actual:</span>{" "}
              {formatCourseLabel(alumno.course)}
            </div>

            <div>
              <span className="text-neutral-500">Grupo:</span>{" "}
              {alumno.day === "PRIV" ? "Privado" : alumno.day ?? "—"}
            </div>

            <div>
              <span className="text-neutral-500">Nivel:</span>{" "}
              {alumno.resolvedLevel ? (
                <AlumnoLevelStatic level={alumno.resolvedLevel} />
              ) : (
                <AlumnoLevelBadge />
              )}
            </div>

            <div>
              <span className="text-neutral-500">Job:</span> próximamente
            </div>
          </>
        )}
      </div>

      <div className="w-[150px]">
        <div
          onClick={openFilePicker}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={[
            "relative w-[150px] h-[190px] rounded-xl border overflow-hidden cursor-pointer transition",
            dragActive
              ? "border-cyan-400 bg-cyan-500/10"
              : "border-neutral-700 bg-neutral-800 hover:bg-neutral-700/70",
          ].join(" ")}
        >
          {customImage ? (
            <img
              src={customImage}
              alt="Imagen personalizada del alumno"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-neutral-400">
              <div className="text-sm font-medium mb-1">Tu imagen</div>
              <div className="text-xs leading-relaxed">
                Haz click o arrastra aquí
              </div>
            </div>
          )}

          {!customImage && (
            <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-[11px] leading-snug text-neutral-200">
              Se guarda solo en este navegador
            </div>
          )}

          {customImage && (
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 rounded-md bg-black/10 px-2 py-1 text-[11px] text-white/30 hover:bg-black/45"
            >
              Quitar
            </button>
          )}

          {isSavingImage && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-white">
              Guardando...
            </div>
          )}
        </div>
      </div>
    </div>

    {imageError && (
      <div className="mb-3 text-[11px] leading-snug text-red-400">
        {imageError}
      </div>
    )}

    <div>
      {!courseId ? (
        <div className="text-xs text-red-400">
          No hay courseId resuelto para este alumno.
        </div>
      ) : (
        <AlumnoTabs
          alumnoId={Number(alumno.id)}
          course={alumno.course ?? ""}
          courseId={courseId}
        />
      )}
    </div>
  </div>
);
}
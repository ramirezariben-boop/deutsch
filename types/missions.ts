export type Mission = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Block =
  | TextBlock
  | MultipleChoiceBlock
  | GridBlock
  | CheckboxGridBlock;

// ========================
// 🔤 TEXT
// ========================
export type TextBlock = {
  id: string;
  type: "text";
  prompt: string;
  correct: string;
};

// ========================
// 🔘 MULTIPLE CHOICE
// ========================
export type MultipleChoiceBlock = {
  id: string;
  type: "multiple_choice";
  prompt: string;
  options: string[];
  correct: string;
};

// ========================
// 📊 GRID (una opción por fila)
// ========================
export type GridBlock = {
  id: string;
  type: "grid";
  prompt: string;
  rows: string[];
  columns: string[];
  correct: Record<string, string>; // row → column
};

// ========================
// 🧩 CHECKBOX GRID (varias por fila)
// ========================
export type CheckboxGridBlock = {
  id: string;
  type: "checkbox_grid";
  prompt: string;
  rows: string[];
  columns: string[];
  correct: Record<string, string[]>; // row → columnas
};
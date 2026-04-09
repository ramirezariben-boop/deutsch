import { Mission } from "@/types/missions";

export const BASICO_2: Record<string, Mission> = {
  "1A": {
    id: "1A",
    title: "Práctica 1A",

    blocks: [
      // ========================
      // 🟦 1a (CHECKBOX GRID)
      // ========================
      {
        id: "1a",
        type: "checkbox_grid",
        prompt:
          "1a. Was kommt in den Kühlschrank, was nicht? Ordnen Sie zu.",

        rows: [
          "Apfel",
          "Ei",
          "Banane",
          "Gurke",
          "Tomate",
          "Müsli",
          "Butter",
          "Salz",
          "Brötchen",
          "Mehl",
          "Essig",
          "Pfeffer",
          "Fleisch",
        ],

        columns: [
          "kommt in den Kühlschrank",
          "kommt nicht in den Kühlschrank",
          "der",
          "die",
          "das",
        ],

        correct: {
          Apfel: ["kommt nicht in den Kühlschrank", "der"],
          Ei: ["kommt in den Kühlschrank", "das"],
          Banane: ["kommt nicht in den Kühlschrank", "die"],
          Gurke: ["kommt in den Kühlschrank", "die"],
          Tomate: ["kommt in den Kühlschrank", "die"],
          Müsli: ["kommt nicht in den Kühlschrank", "das"],
          Butter: ["kommt in den Kühlschrank", "die"],
          Salz: ["kommt nicht in den Kühlschrank", "das"],
          Brötchen: ["kommt nicht in den Kühlschrank", "das"],
          Mehl: ["kommt nicht in den Kühlschrank", "das"],
          Essig: ["kommt nicht in den Kühlschrank", "der"],
          Pfeffer: ["kommt nicht in den Kühlschrank", "der"],
          Fleisch: ["kommt in den Kühlschrank", "das"],
        },
      },

      // ========================
      // 🟨 2 (GRID)
      // ========================
      {
        id: "2",
        type: "grid",
        prompt:
          "2. Wie heißen die Geschäfte? Notieren Sie die Wörter mit Artikel",

        rows: ["IEREGZTEM", "TKRAM", "IEREKCÄB", "TKRAMREPUS"],
        columns: ["der", "die", "das"],

        correct: {
          IEREGZTEM: "die", // Metzgerei
          TKRAM: "der", // Markt
          IEREKCÄB: "die", // Bäckerei
          TKRAMREPUS: "der", // Supermarkt
        },
      },

      // ========================
      // 🟥 TEXTS
      // ========================
      {
        id: "2a",
        type: "text",
        prompt: "Ordnen Sie: IEREGZTEM",
        correct: "Metzgerei",
      },
      {
        id: "2b",
        type: "text",
        prompt: "Ordnen Sie: TKRAM",
        correct: "Markt",
      },
      {
        id: "2c",
        type: "text",
        prompt: "Ordnen Sie: IEREKCÄB",
        correct: "Bäckerei",
      },
      {
        id: "2d",
        type: "text",
        prompt: "Ordnen Sie: TKRAMREPUS",
        correct: "Supermarkt",
      },
    ],
  },
};
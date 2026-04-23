// config/missions/intermedio_2.ts
export const MISSIONS_INTERMEDIO_2 = {
  "1A": {
    id: "1A",
    title: "Misión 1A",
    blocks: [
      {
        id: "1a-0",
        prompt: "1a. Urlaub in der Natur. (1)",
        type: "text",
        correct: "faulenzen",
      },
      {
        id: "1a-1",
        prompt: "1a. Urlaub in der Natur. (2)",
        type: "text",
        correct: "Himmel",
      },
      {
        id: "1a-2",
        prompt: "1a. Urlaub in der Natur. (3a)",
        type: "text",
        correct: "übernachte",
      },
      {
        id: "1a-3",
        prompt: "1a. Urlaub in der Natur. (3b)",
        type: "text",
        correct: "im Freien",
      },
      {
        id: "1a-4",
        prompt: "1a. Urlaub in der Natur. (4)",
        type: "text",
        correct: "Insekten",
      },
      {
        id: "1a-5",
        prompt: "1a. Urlaub in der Natur. (5)",
        type: "text",
        correct: "Netz",
      },
      {
        id: "1a-6",
        prompt: "1a. Urlaub in der Natur. (6)",
        type: "text",
        correct: "Pilze",
      },
      {
        id: "1a-7",
        prompt: "1a. Urlaub in der Natur. (7)",
        type: "text",
        correct: "giftig",
      },
      {
        id: "1b-0",
        prompt: "1b. Was brauchen die Personen für ihren Urlaub? Hören Sie die Gespräche und notieren Sie je fünf Dinge.",
        type: "checkbox_grid",
        rows: [
          "eine Bootstour machen",
          "Surfen an der Ostsee"
        ],
        columns: [
          "Sonnencreme",
          "Schlafsack",
          "Bücher",
          "Spiele",
          "Regenkleidung",
          "Sonnenbrille (mit Band)",
          "Tropfen für die Augen / Augentropfen"
        ],
        correct: {
          "eine Bootstour machen": [
            "Sonnencreme",
            "Schlafsack",
            "Bücher",
            "Spiele"
          ],
          "Surfen an der Ostsee": [
            "Regenkleidung",
            "Sonnenbrille (mit Band)",
            "Tropfen für die Augen / Augentropfen",
            "Sonnencreme"
          ]
        }
      }
    ]
  },
  "1B": {
    "id": "1B",
    "title": "Misión 1B",
    "blocks": [
      {
        "id": "1b-0",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (1) Das ___ jedenfalls nicht. Optionen: stimmt / klingt",
        "type": "text",
        "correct": "stimmt"
      },
      {
        "id": "1b-1",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (2) ... wenn man hier in Norwegen ___ ist. Optionen: unterwegs / überall",
        "type": "text",
        "correct": "unterwegs"
      },
      {
        "id": "1b-2",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (3) ... das kann doch nicht ___ sein. Optionen: klar / wahr",
        "type": "text",
        "correct": "wahr"
      },
      {
        "id": "1b-3",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (4) Am ersten Tag haben wir noch ___. Optionen: gedacht / gelacht",
        "type": "text",
        "correct": "gelacht"
      },
      {
        "id": "1b-4",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (5) ... aber heute ist die ___ schon groß. Optionen: Entscheidung / Enttäuschung",
        "type": "text",
        "correct": "Enttäuschung"
      },
      {
        "id": "1b-5",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (6) Noch eine Nacht im Zelt, das ___ wir nicht. Optionen: dürfen / wollen",
        "type": "text",
        "correct": "wollen"
      },
      {
        "id": "1b-6",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (7) Heute ___ wir in einem netten, kleinen Hotel. Optionen: essen / übernachten",
        "type": "text",
        "correct": "übernachten"
      },
      {
        "id": "1b-7",
        "prompt": "2. Berichte aus dem Urlaub. Text 1. (8) Aber ___ für morgen ist gut. Kein Regen! Optionen: der Wetterbericht / die Nachricht",
        "type": "text",
        "correct": "der Wetterbericht"
      },
      {
        "id": "1b-8",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (9) Wir finden das ___. Optionen: langweilig / entspannend",
        "type": "text",
        "correct": "entspannend"
      },
      {
        "id": "1b-9",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (10) ... drei Tage lang nur Wasser und ___. Optionen: Umgebung / Natur",
        "type": "text",
        "correct": "Natur"
      },
      {
        "id": "1b-10",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (11) Im Urlaub ist diese Ruhe ___. Optionen: einsam / wunderbar",
        "type": "text",
        "correct": "wunderbar"
      },
      {
        "id": "1b-11",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (12) Gestern Abend waren wir in einem ___ Restaurant. Optionen: gemütlichen / gemeinsamen",
        "type": "text",
        "correct": "gemütlichen"
      },
      {
        "id": "1b-12",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (13) ... und wir haben nette Leute ___. Optionen: getroffen / gefunden",
        "type": "text",
        "correct": "getroffen"
      },
      {
        "id": "1b-13",
        "prompt": "2. Berichte aus dem Urlaub. Text 2. (14) Sie wollen uns ein paar besonders schöne Orte ___. Optionen: helfen / zeigen",
        "type": "text",
        "correct": "zeigen"
      }
    ]
  },

  "1C": {
    "id": "1C",
    "title": "Misión 1C",
    "blocks": [
      {
        "id": "1c-0",
        "prompt": "3. Rund um den Urlaub. Lesen Sie die Überschriften (A–J) und die Texte (1–5). Schreiben Sie den passenden Buchstaben in die Tabelle. A = Neun Tage Urlaub im Jahr sind genug | B = Immer weniger Deutsche fahren nach Mallorca | C = Kinder erleben Alltag auf dem Bauernhof | D = Urlaub im eigenen Land ist am beliebtesten | E = Frühes Buchen ist am billigsten | F = Lieber mehr kürzere Urlaube als einen langen | G = Mit Schulkindern wird der Urlaub teurer | H = Kinder lernen alles über Tiere | I = Wer früh bucht, der hat die Wahl | J = Billig reisen auch in der Hauptsaison",
        "type": "grid",
        "rows": [
          "Text 1",
          "Text 2",
          "Text 3",
          "Text 4",
          "Text 5"
        ],
        "columns": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J"
        ],
        "correct": {
          "Text 1": "C",
          "Text 2": "F",
          "Text 3": "I",
          "Text 4": "G",
          "Text 5": "D"
        }
      }
    ]
  }
} as const;
export const MISSIONS_INTERMEDIO_3 = {
  "1A": {
    id: "1A",
    title: "Misión 1A",
    blocks: [
      {
        id: "1a-0",
        prompt:
          "1a. Veränderungen. User r2d2. (1) Früher haben viele Leute unter sehr schlechten ___ gearbeitet. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Bedingungen",
      },
      {
        id: "1a-1",
        prompt:
          "1a. Veränderungen. User r2d2. (2) In vielen ___ war es laut, die Arbeit war schwer und häufig auch gefährlich. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Betrieben",
      },
      {
        id: "1a-2",
        prompt:
          "1a. Veränderungen. User r2d2. (3) Heute erledigen oft Roboter die monotonen ___. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Tätigkeiten",
      },
      {
        id: "1a-3",
        prompt:
          "1a. Veränderungen. User r2d2. (4) Aber die ___ zwischen den Betrieben und der Stress für die Arbeiterinnen und Arbeiter sind auch größer geworden. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Konkurrenz",
      },

      {
        id: "1a-4",
        prompt:
          "1a. Veränderungen. User Dodo. (5) Die Möglichkeiten für die ___ von Krankheiten sind viel besser geworden. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Diagnose",
      },
      {
        id: "1a-5",
        prompt:
          "1a. Veränderungen. User Dodo. (6) ... genauso wie die ___ Geräte. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "medizinischen",
      },
      {
        id: "1a-6",
        prompt:
          "1a. Veränderungen. User Dodo. (7) Aber es gibt immer noch viele Krankheiten, die man nicht ___ kann. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "heilen",
      },
      {
        id: "1a-7",
        prompt:
          "1a. Veränderungen. User Dodo. (8) ... aber insgesamt arbeite ich gern als ___. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Pflegekraft",
      },

      {
        id: "1a-8",
        prompt:
          "1a. Veränderungen. User nada08. (9) Als ich zur Schule gegangen bin, da war ___ sehr wichtig. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Disziplin",
      },
      {
        id: "1a-9",
        prompt:
          "1a. Veränderungen. User nada08. (10) ... und wir Schülerinnen und Schüler haben auch noch ___ bekommen. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Strafen",
      },
      {
        id: "1a-10",
        prompt:
          "1a. Veränderungen. User nada08. (11) Heute können Schülerinnen und Schüler im Unterricht und zum Lernen ___ nutzen und selbstständiger sein. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Medien",
      },
      {
        id: "1a-11",
        prompt:
          "1a. Veränderungen. User nada08. (12) Ich hatte vor strengen Lehrern und Strafen ___, die Schülerinnen und Schüler heute vor schlechten Noten. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
        type: "text",
        correct: "Angst",
      },

      {
        id: "1b-0",
        prompt:
          "1b. Lesen Sie die Kommentare in 1a noch einmal. Welche Überschrift passt zu welchem Kommentar? 1 = Die moderne Medizin hilft vielen | 2 = Keine Angst vor der Schule | 3 = Weniger Stress bei der Arbeit | 4 = Sind Jobs heute leichter? | 5 = Schüler können mehr entscheiden",
        type: "grid",
        rows: ["User r2d2", "User Dodo", "User nada08"],
        columns: ["1", "2", "3", "4", "5"],
        correct: {
          "User r2d2": "4",
          "User Dodo": "1",
          "User nada08": "5",
        },
      },
    ],
  },

  "1B": {
    id: "1B",
    title: "Misión 1B",
    blocks: [
      {
        id: "2-0",
        prompt:
          "2. Lesen Sie den Text. (1) Wenn man über Veränderungen spricht, darf man die ___ nicht vergessen. Optionen: Ernährung / Erklärung",
        type: "text",
        correct: "Ernährung",
      },
      {
        id: "2-1",
        prompt:
          "2. Lesen Sie den Text. (2) Viele achten beim Einkauf bewusst auf frische ___. Optionen: Speisen / Nahrungsmittel",
        type: "text",
        correct: "Nahrungsmittel",
      },
      {
        id: "2-2",
        prompt:
          "2. Lesen Sie den Text. (3) ... denn die haben mehr ___. Optionen: Vitamine / Inhalt",
        type: "text",
        correct: "Vitamine",
      },
      {
        id: "2-3",
        prompt:
          "2. Lesen Sie den Text. (4) Und es gibt noch einen ___. Optionen: Trend / Traum",
        type: "text",
        correct: "Trend",
      },
      {
        id: "2-4",
        prompt:
          "2. Lesen Sie den Text. (5) Es kommen immer mehr ___ produzierte Lebensmittel auf den Tisch. Optionen: logisch / biologisch",
        type: "text",
        correct: "biologisch",
      },
      {
        id: "2-5",
        prompt:
          "2. Lesen Sie den Text. (6) Immer mehr Leute verzichten auch auf Fleisch und ernähren sich ___. Optionen: vegetarisch / gesund",
        type: "text",
        correct: "vegetarisch",
      },
      {
        id: "2-6",
        prompt:
          "2. Lesen Sie den Text. (7) Sie ernähren sich ausschließlich ___. Optionen: vegan / einfach",
        type: "text",
        correct: "vegan",
      },
      {
        id: "2-7",
        prompt:
          "2. Lesen Sie den Text. (8) ... und essen gern frische ___. Optionen: Eier / Früchte",
        type: "text",
        correct: "Früchte",
      },
      {
        id: "2-8",
        prompt:
          "2. Lesen Sie den Text. (9) Zur veganen Ernährung gehören auch Säfte aus ___ und anderem Gemüse. Optionen: Karotten / Kartoffeln",
        type: "text",
        correct: "Karotten",
      },
      {
        id: "2-9",
        prompt:
          "2. Lesen Sie den Text. (10) Dazu kommt, dass viele Leute eine bestimmte ___ halten wollen oder müssen. Optionen: Diät / Form",
        type: "text",
        correct: "Diät",
      },
      {
        id: "2-10",
        prompt:
          "2. Lesen Sie den Text. (11) Viele, die sich gesund ernähren, achten auch auf ihre ___. Optionen: Fitness / Freiheit",
        type: "text",
        correct: "Fitness",
      },
      {
        id: "2-11",
        prompt:
          "2. Lesen Sie den Text. (12) ... und machen täglich ihr ___. Optionen: Frühstück / Workout",
        type: "text",
        correct: "Workout",
      },
    ],
  },

  "1C": {
    id: "1C",
    title: "Misión 1C",
    blocks: [
      {
        id: "3a-0",
        prompt:
          "3a. Wurden Sie Ihr Leben gern ändern? Hören Sie fünf kurze Texte und entscheiden Sie: richtig oder falsch.",
        type: "grid",
        rows: [
          "1. Der Sprecher ist mit seinem Leben unzufrieden.",
          "2. Die Sprecherin hätte gern mehr Gehalt.",
          "3. Der Sprecher möchte mehr Freizeit haben.",
          "4. Die Sprecherin macht bald eine Weltreise.",
          "5. Der Sprecher hat seinen Traum realisiert.",
        ],
        columns: ["richtig", "falsch"],
        correct: {
          "1. Der Sprecher ist mit seinem Leben unzufrieden.": "richtig",
          "2. Die Sprecherin hätte gern mehr Gehalt.": "richtig",
          "3. Der Sprecher möchte mehr Freizeit haben.": "falsch",
          "4. Die Sprecherin macht bald eine Weltreise.": "richtig",
          "5. Der Sprecher hat seinen Traum realisiert.": "falsch",
        },
      },
      {
        id: "3b-0",
        prompt:
          "3b. Was heißt das? Ordnen Sie die Beschreibungen zu. A = Jemand ist gestorben. | B = Es ist etwas passiert. Nach diesem Ereignis ist alles anders. | C = Alle wichtigen Ereignisse, die es bisher im Leben einer Person gab. | D = Es gibt ein großes Problem. | E = Zwei Personen, die ein Paar waren, verstehen sich nicht mehr gut und gehen wieder eigene Wege.",
        type: "grid",
        rows: [
          "1. eine Krisensituation",
          "2. eine Trennung",
          "3. ein Todesfall",
          "4. ein Wendepunkt",
          "5. die Lebensgeschichte",
        ],
        columns: ["A", "B", "C", "D", "E"],
        correct: {
          "1. eine Krisensituation": "D",
          "2. eine Trennung": "E",
          "3. ein Todesfall": "A",
          "4. ein Wendepunkt": "B",
          "5. die Lebensgeschichte": "C",
        },
      },
    ],
  },
} as const;
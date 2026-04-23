export const MISSIONS_INTERMEDIO_3 = {
"1A": {
  id: "1A",
  title: "Misión 1A",
  variants: {
    default: {
      title: "Mission 1A",
      shortDescription:
        "Versión del libro.",
      difficulty: 1,
      bonusMxp: 0,
      blocks: [
        {
          id: "1a-d-0",
          prompt:
            "1a. Veränderungen. User r2d2. (1) Früher haben viele Leute unter sehr schlechten ___ gearbeitet. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Bedingungen",
        },
        {
          id: "1a-d-1",
          prompt:
            "1a. Veränderungen. User r2d2. (2) In vielen ___ war es laut, die Arbeit war schwer und häufig auch gefährlich. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Betrieben",
        },
        {
          id: "1a-d-2",
          prompt:
            "1a. Veränderungen. User r2d2. (3) Heute erledigen oft Roboter die monotonen ___. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Tätigkeiten",
        },
        {
          id: "1a-d-3",
          prompt:
            "1a. Veränderungen. User r2d2. (4) Aber die ___ zwischen den Betrieben und der Stress für die Arbeiterinnen und Arbeiter sind auch größer geworden. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Konkurrenz",
        },
        {
          id: "1a-d-4",
          prompt:
            "1a. Veränderungen. User Dodo. (5) Die Möglichkeiten für die ___ von Krankheiten sind viel besser geworden. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Diagnose",
        },
        {
          id: "1a-d-5",
          prompt:
            "1a. Veränderungen. User Dodo. (6) ... genauso wie die ___ Geräte. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "medizinischen",
        },
        {
          id: "1a-d-6",
          prompt:
            "1a. Veränderungen. User Dodo. (7) Aber es gibt immer noch viele Krankheiten, die man nicht ___ kann. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "heilen",
        },
        {
          id: "1a-d-7",
          prompt:
            "1a. Veränderungen. User Dodo. (8) ... aber insgesamt arbeite ich gern als ___. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Pflegekraft",
        },
        {
          id: "1a-d-8",
          prompt:
            "1a. Veränderungen. User nada08. (9) Als ich zur Schule gegangen bin, da war ___ sehr wichtig. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Disziplin",
        },
        {
          id: "1a-d-9",
          prompt:
            "1a. Veränderungen. User nada08. (10) ... und wir Schülerinnen und Schüler haben auch noch ___ bekommen. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Strafen",
        },
        {
          id: "1a-d-10",
          prompt:
            "1a. Veränderungen. User nada08. (11) Heute können Schülerinnen und Schüler im Unterricht und zum Lernen ___ nutzen und selbstständiger sein. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Medien",
        },
        {
          id: "1a-d-11",
          prompt:
            "1a. Veränderungen. User nada08. (12) Ich hatte vor strengen Lehrern und Strafen ___, die Schülerinnen und Schüler heute vor schlechten Noten. Optionen: Angst / Bedingungen / Betrieben / Diagnose / Disziplin / heilen / Konkurrenz / Medien / medizinischen / Pflegekraft / Strafen / Tätigkeiten",
          type: "text",
          correct: "Angst",
        },
        {
          id: "1b-d-0",
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
      ]
    },

    arbeit: {
      title: "Mission 1A – Arbeit",
      shortDescription:
        "Foco en cambios en el trabajo: condiciones, empresas, tareas repetitivas, competencia y estrés.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "1a-a-0",
          prompt:
            "1A Arbeit. Ordnen Sie die Wörter der passenden Idee zu.",
          type: "grid",
          rows: [
            "Bedingungen",
            "Betrieben",
            "Tätigkeiten",
            "Konkurrenz"
          ],
          columns: [
            "Arbeitsumfeld",
            "Ort / Organisation",
            "Aufgaben",
            "Druck / Wettbewerb"
          ],
          correct: {
            "Bedingungen": "Arbeitsumfeld",
            "Betrieben": "Ort / Organisation",
            "Tätigkeiten": "Aufgaben",
            "Konkurrenz": "Druck / Wettbewerb"
          }
        },
        {
          id: "1a-a-1",
          prompt:
            "1A Arbeit. Welche Formulierung passt am besten?",
          type: "grid",
          rows: [
            "Früher waren sie oft schlecht; heute sind sie in manchen Bereichen besser.",
            "Dort war es laut, schwer und oft gefährlich.",
            "Roboter übernehmen heute oft die monotonen Aufgaben.",
            "Sie zwischen Firmen ist heute oft größer geworden.",
            "Sie beschreibt Druck zwischen Firmen auf dem Markt."
          ],
          columns: [
            "Bedingungen",
            "Betrieben",
            "Tätigkeiten",
            "Konkurrenz"
          ],
          correct: {
            "Früher waren sie oft schlecht; heute sind sie in manchen Bereichen besser.": "Bedingungen",
            "Dort war es laut, schwer und oft gefährlich.": "Betrieben",
            "Roboter übernehmen heute oft die monotonen Aufgaben.": "Tätigkeiten",
            "Sie zwischen Firmen ist heute oft größer geworden.": "Konkurrenz",
            "Sie beschreibt Druck zwischen Firmen auf dem Markt.": "Konkurrenz"
          }
        },
        {
          id: "1a-a-2",
          prompt:
            "1A Arbeit. Welche Überschrift passt zum Kommentar von User r2d2? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "4"
        },
        {
          id: "1a-a-3",
          prompt:
            "1A Arbeit. Welche Überschrift passt am besten zusätzlich zur Aussage über Stress und Konkurrenz? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "3"
        }
      ]
    },

    "medizin-schule": {
      title: "Mission 1A – Medizin & Schule",
      shortDescription:
        "Foco en cambios en medicina y escuela: diagnóstico, cura, tecnología, disciplina, castigos, medios y miedo.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "1a-ms-0",
          prompt:
            "1A Medizin & Schule. Ordnen Sie die Wörter der passenden área temática zu.",
          type: "grid",
          rows: [
            "Diagnose",
            "medizinischen",
            "heilen",
            "Pflegekraft",
            "Disziplin",
            "Strafen",
            "Medien",
            "Angst"
          ],
          columns: [
            "Medizin",
            "Schule"
          ],
          correct: {
            "Diagnose": "Medizin",
            "medizinischen": "Medizin",
            "heilen": "Medizin",
            "Pflegekraft": "Medizin",
            "Disziplin": "Schule",
            "Strafen": "Schule",
            "Medien": "Schule",
            "Angst": "Schule"
          }
        },
        {
          id: "1a-ms-1",
          prompt:
            "1A Medizin & Schule. Welche Formulierung passt am besten?",
          type: "grid",
          rows: [
            "Sie hilft dabei, Krankheiten zu erkennen.",
            "So nennt man Geräte aus dem Bereich Gesundheit und Behandlung.",
            "Das Verb bedeutet, eine Krankheit gesund zu machen.",
            "So heißt ein Beruf im Gesundheitsbereich.",
            "Früher war sie in der Schule sehr wichtig.",
            "Schüler bekamen sie früher zusätzlich.",
            "Heute kann man sie zum Lernen im Unterricht nutzen.",
            "Dieses Gefühl hatte man vor strengen Lehrern."
          ],
          columns: [
            "Diagnose",
            "medizinischen",
            "heilen",
            "Pflegekraft",
            "Disziplin",
            "Strafen",
            "Medien",
            "Angst"
          ],
          correct: {
            "Sie hilft dabei, Krankheiten zu erkennen.": "Diagnose",
            "So nennt man Geräte aus dem Bereich Gesundheit und Behandlung.": "medizinischen",
            "Das Verb bedeutet, eine Krankheit gesund zu machen.": "heilen",
            "So heißt ein Beruf im Gesundheitsbereich.": "Pflegekraft",
            "Früher war sie in der Schule sehr wichtig.": "Disziplin",
            "Schüler bekamen sie früher zusätzlich.": "Strafen",
            "Heute kann man sie zum Lernen im Unterricht nutzen.": "Medien",
            "Dieses Gefühl hatte man vor strengen Lehrern.": "Angst"
          }
        },
        {
          id: "1a-ms-2",
          prompt:
            "1A Medizin & Schule. Welche Überschrift passt zu User Dodo? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "1"
        },
        {
          id: "1a-ms-3",
          prompt:
            "1A Medizin & Schule. Welche Überschrift passt zu User nada08? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "5"
        },
        {
          id: "1a-ms-4",
          prompt:
            "1A Medizin & Schule. Welche Überschrift passt zusätzlich zur Aussage über weniger Angst in der Schule? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "2"
        }
      ]
    }
  }
},

"1B": {
  id: "1B",
  title: "Misión 1B",
  variants: {
    default: {
      title: "Mission 1B",
      shortDescription: "Versión del libro.",
      difficulty: 1,
      bonusMxp: 0,
      blocks: [
        {
          id: "2-d-0",
          prompt:
            "2. Lesen Sie den Text. (1) Wenn man über Veränderungen spricht, darf man die ___ nicht vergessen. Optionen: Ernährung / Erklärung",
          type: "text",
          correct: "Ernährung",
        },
        {
          id: "2-d-1",
          prompt:
            "2. Lesen Sie den Text. (2) Viele achten beim Einkauf bewusst auf frische ___. Optionen: Speisen / Nahrungsmittel",
          type: "text",
          correct: "Nahrungsmittel",
        },
        {
          id: "2-d-2",
          prompt:
            "2. Lesen Sie den Text. (3) ... denn die haben mehr ___. Optionen: Vitamine / Inhalt",
          type: "text",
          correct: "Vitamine",
        },
        {
          id: "2-d-3",
          prompt:
            "2. Lesen Sie den Text. (4) Und es gibt noch einen ___. Optionen: Trend / Traum",
          type: "text",
          correct: "Trend",
        },
        {
          id: "2-d-4",
          prompt:
            "2. Lesen Sie den Text. (5) Es kommen immer mehr ___ produzierte Lebensmittel auf den Tisch. Optionen: logisch / biologisch",
          type: "text",
          correct: "biologisch",
        },
        {
          id: "2-d-5",
          prompt:
            "2. Lesen Sie den Text. (6) Immer mehr Leute verzichten auch auf Fleisch und ernähren sich ___. Optionen: vegetarisch / gesund",
          type: "text",
          correct: "vegetarisch",
        },
        {
          id: "2-d-6",
          prompt:
            "2. Lesen Sie den Text. (7) Sie ernähren sich ausschließlich ___. Optionen: vegan / einfach",
          type: "text",
          correct: "vegan",
        },
        {
          id: "2-d-7",
          prompt:
            "2. Lesen Sie den Text. (8) ... und essen gern frische ___. Optionen: Eier / Früchte",
          type: "text",
          correct: "Früchte",
        },
        {
          id: "2-d-8",
          prompt:
            "2. Lesen Sie den Text. (9) Zur veganen Ernährung gehören auch Säfte aus ___ und anderem Gemüse. Optionen: Karotten / Kartoffeln",
          type: "text",
          correct: "Karotten",
        },
        {
          id: "2-d-9",
          prompt:
            "2. Lesen Sie den Text. (10) Dazu kommt, dass viele Leute eine bestimmte ___ halten wollen oder müssen. Optionen: Diät / Form",
          type: "text",
          correct: "Diät",
        },
        {
          id: "2-d-10",
          prompt:
            "2. Lesen Sie den Text. (11) Viele, die sich gesund ernähren, achten auch auf ihre ___. Optionen: Fitness / Freiheit",
          type: "text",
          correct: "Fitness",
        },
        {
          id: "2-d-11",
          prompt:
            "2. Lesen Sie den Text. (12) ... und machen täglich ihr ___. Optionen: Frühstück / Workout",
          type: "text",
          correct: "Workout",
        }
      ]
    },

    ernaehrung: {
      title: "Mission 1B – Ernährung",
      shortDescription:
        "Foco en alimentación: productos frescos, vitaminas, bio, vegetarisch, vegan y hábitos de consumo.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "2-e-0",
          prompt:
            "1B Ernährung. Ordnen Sie die Wörter der passenden Kategorie zu.",
          type: "grid",
          rows: [
            "Ernährung",
            "Nahrungsmittel",
            "Vitamine",
            "biologisch",
            "vegetarisch",
            "vegan",
            "Früchte",
            "Karotten"
          ],
          columns: [
            "allgemeines Thema",
            "Lebensmittel / Inhalt",
            "Ernährungsform / Eigenschaft"
          ],
          correct: {
            "Ernährung": "allgemeines Thema",
            "Nahrungsmittel": "Lebensmittel / Inhalt",
            "Vitamine": "Lebensmittel / Inhalt",
            "biologisch": "Ernährungsform / Eigenschaft",
            "vegetarisch": "Ernährungsform / Eigenschaft",
            "vegan": "Ernährungsform / Eigenschaft",
            "Früchte": "Lebensmittel / Inhalt",
            "Karotten": "Lebensmittel / Inhalt"
          }
        },
        {
          id: "2-e-1",
          prompt:
            "1B Ernährung. Welche Formulierung passt am besten?",
          type: "grid",
          rows: [
            "So heißt das allgemeine Thema rund ums Essen.",
            "Darauf achtet man beim Einkauf, wenn man bewusst isst.",
            "Davon haben frische Produkte oft mehr.",
            "So nennt man Produkte, die nicht konventionell hergestellt sind.",
            "So ernährt man sich ohne Fleisch.",
            "So ernährt man sich ausschließlich pflanzlich.",
            "Diese isst man gern frisch und sie sind oft süß.",
            "Daraus kann man zusammen mit anderem Gemüse Säfte machen."
          ],
          columns: [
            "Ernährung",
            "Nahrungsmittel",
            "Vitamine",
            "biologisch",
            "vegetarisch",
            "vegan",
            "Früchte",
            "Karotten"
          ],
          correct: {
            "So heißt das allgemeine Thema rund ums Essen.": "Ernährung",
            "Darauf achtet man beim Einkauf, wenn man bewusst isst.": "Nahrungsmittel",
            "Davon haben frische Produkte oft mehr.": "Vitamine",
            "So nennt man Produkte, die nicht konventionell hergestellt sind.": "biologisch",
            "So ernährt man sich ohne Fleisch.": "vegetarisch",
            "So ernährt man sich ausschließlich pflanzlich.": "vegan",
            "Diese isst man gern frisch und sie sind oft süß.": "Früchte",
            "Daraus kann man zusammen mit anderem Gemüse Säfte machen.": "Karotten"
          }
        },
        {
          id: "2-e-2",
          prompt:
            "1B Ernährung. Welche Ernährungsform passt? Kein Fleisch, aber nicht unbedingt komplett pflanzlich. Optionen: vegetarisch / vegan",
          type: "text",
          correct: "vegetarisch",
        },
        {
          id: "2-e-3",
          prompt:
            "1B Ernährung. Welche Ernährungsform passt? Ausschließlich pflanzlich. Optionen: vegetarisch / vegan",
          type: "text",
          correct: "vegan",
        }
      ]
    },

    fitness: {
      title: "Mission 1B – Fitness & Diät",
      shortDescription:
        "Foco en hábitos de salud: tendencia, dieta, forma física y rutina diaria.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "2-f-0",
          prompt:
            "1B Fitness. Ordnen Sie die Wörter der passenden Idee zu.",
          type: "grid",
          rows: [
            "Trend",
            "Diät",
            "Fitness",
            "Workout",
            "Vitamine",
            "Ernährung"
          ],
          columns: [
            "Entwicklung / Tendenz",
            "Gesundheit / Körper",
            "Essen / Lebensstil"
          ],
          correct: {
            "Trend": "Entwicklung / Tendenz",
            "Diät": "Gesundheit / Körper",
            "Fitness": "Gesundheit / Körper",
            "Workout": "Gesundheit / Körper",
            "Vitamine": "Essen / Lebensstil",
            "Ernährung": "Essen / Lebensstil"
          }
        },
        {
          id: "2-f-1",
          prompt:
            "1B Fitness. Welche Formulierung passt am besten?",
          type: "grid",
          rows: [
            "So nennt man eine Entwicklung, die gerade viele Leute interessant finden.",
            "Man hält sie, wenn man aus gesundheitlichen Gründen oder bewusst anders essen will.",
            "Darauf achtet man, wenn man körperlich in guter Form bleiben möchte.",
            "Das macht man täglich, wenn man trainiert.",
            "Frische Produkte enthalten davon oft mehr.",
            "Ohne sie kann man nicht sinnvoll über bewusste Essgewohnheiten sprechen."
          ],
          columns: [
            "Trend",
            "Diät",
            "Fitness",
            "Workout",
            "Vitamine",
            "Ernährung"
          ],
          correct: {
            "So nennt man eine Entwicklung, die gerade viele Leute interessant finden.": "Trend",
            "Man hält sie, wenn man aus gesundheitlichen Gründen oder bewusst anders essen will.": "Diät",
            "Darauf achtet man, wenn man körperlich in guter Form bleiben möchte.": "Fitness",
            "Das macht man täglich, wenn man trainiert.": "Workout",
            "Frische Produkte enthalten davon oft mehr.": "Vitamine",
            "Ohne sie kann man nicht sinnvoll über bewusste Essgewohnheiten sprechen.": "Ernährung"
          }
        },
        {
          id: "2-f-2",
          prompt:
            "1B Fitness. Welches Wort passt? Viele Menschen wollen fit bleiben und achten deshalb auf ihre ___. Optionen: Fitness / Diät / Trend",
          type: "text",
          correct: "Fitness",
        },
        {
          id: "2-f-3",
          prompt:
            "1B Fitness. Welches Wort passt? Nach dem Training machen manche täglich ihr ___. Optionen: Workout / Trend / Ernährung",
          type: "text",
          correct: "Workout",
        },
        {
          id: "2-f-4",
          prompt:
            "1B Fitness. Welches Wort passt? Wenn jemand aus gesundheitlichen Gründen anders essen muss, hält er oft eine ___. Optionen: Diät / Fitness / Vitamin",
          type: "text",
          correct: "Diät",
        }
      ]
    }
  }
},

"1C": {
  id: "1C",
  title: "Misión 1C",
  variants: {
    default: {
      title: "Mission 1C",
      shortDescription: "Versión del libro.",
      difficulty: 1,
      bonusMxp: 0,
      blocks: [
        {
          id: "3a-d-0",
          prompt:
            "3a. Wurden Sie Ihr Leben gern ändern? Hören Sie fünf kurze Texte und entscheiden Sie: richtig oder falsch.",
          type: "grid",
          rows: [
            "1. Der Sprecher ist mit seinem Leben unzufrieden.",
            "2. Die Sprecherin hätte gern mehr Gehalt.",
            "3. Der Sprecher möchte mehr Freizeit haben.",
            "4. Die Sprecherin macht bald eine Weltreise.",
            "5. Der Sprecher hat seinen Traum realisiert."
          ],
          columns: ["richtig", "falsch"],
          correct: {
            "1. Der Sprecher ist mit seinem Leben unzufrieden.": "richtig",
            "2. Die Sprecherin hätte gern mehr Gehalt.": "richtig",
            "3. Der Sprecher möchte mehr Freizeit haben.": "falsch",
            "4. Die Sprecherin macht bald eine Weltreise.": "richtig",
            "5. Der Sprecher hat seinen Traum realisiert.": "falsch"
          }
        },
        {
          id: "3b-d-0",
          prompt:
            "3b. Was heißt das? Ordnen Sie die Beschreibungen zu. A = Jemand ist gestorben. | B = Es ist etwas passiert. Nach diesem Ereignis ist alles anders. | C = Alle wichtigen Ereignisse, die es bisher im Leben einer Person gab. | D = Es gibt ein großes Problem. | E = Zwei Personen, die ein Paar waren, verstehen sich nicht mehr gut und gehen wieder eigene Wege.",
          type: "grid",
          rows: [
            "1. eine Krisensituation",
            "2. eine Trennung",
            "3. ein Todesfall",
            "4. ein Wendepunkt",
            "5. die Lebensgeschichte"
          ],
          columns: ["A", "B", "C", "D", "E"],
          correct: {
            "1. eine Krisensituation": "D",
            "2. eine Trennung": "E",
            "3. ein Todesfall": "A",
            "4. ein Wendepunkt": "B",
            "5. die Lebensgeschichte": "C"
          }
        }
      ]
    },

    lebensaenderung: {
      title: "Mission 1C – Lebensänderung",
      shortDescription:
        "Foco en situaciones de vida, insatisfacción, proyectos, cambios deseados y decisiones personales.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "3a-l-0",
          prompt:
            "1C Lebensänderung. Wurden Sie Ihr Leben gern ändern? Entscheiden Sie: richtig oder falsch.",
          type: "grid",
          rows: [
            "1. Der Sprecher ist mit seinem Leben unzufrieden.",
            "2. Die Sprecherin hätte gern mehr Gehalt.",
            "3. Der Sprecher möchte mehr Freizeit haben.",
            "4. Die Sprecherin macht bald eine Weltreise.",
            "5. Der Sprecher hat seinen Traum realisiert."
          ],
          columns: ["richtig", "falsch"],
          correct: {
            "1. Der Sprecher ist mit seinem Leben unzufrieden.": "richtig",
            "2. Die Sprecherin hätte gern mehr Gehalt.": "richtig",
            "3. Der Sprecher möchte mehr Freizeit haben.": "falsch",
            "4. Die Sprecherin macht bald eine Weltreise.": "richtig",
            "5. Der Sprecher hat seinen Traum realisiert.": "falsch"
          }
        },
        {
          id: "3a-l-1",
          prompt:
            "1C Lebensänderung. Welche Aussage passt am besten zu einer Person, die ihr Leben ändern möchte, weil sie unzufrieden ist? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "1"
        },
        {
          id: "3a-l-2",
          prompt:
            "1C Lebensänderung. Welche Aussage passt am besten zu einer Person, die mehr Geld haben möchte? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "2"
        },
        {
          id: "3a-l-3",
          prompt:
            "1C Lebensänderung. Welche Aussage passt am besten zu einer Person, die bald ein großes Reiseprojekt plant? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "4"
        },
        {
          id: "3a-l-4",
          prompt:
            "1C Lebensänderung. Welche Aussage passt am besten zu einer Person, deren Traum noch nicht Wirklichkeit geworden ist? Optionen: 1 / 2 / 3 / 4 / 5",
          type: "text",
          correct: "5"
        }
      ]
    },

    begriffe: {
      title: "Mission 1C – Begriffe",
      shortDescription:
        "Foco en vocabulario abstracto: crisis, separación, muerte, punto de inflexión e historia de vida.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "3b-b-0",
          prompt:
            "1C Begriffe. Was heißt das? Ordnen Sie die Beschreibungen zu. A = Jemand ist gestorben. | B = Es ist etwas passiert. Nach diesem Ereignis ist alles anders. | C = Alle wichtigen Ereignisse, die es bisher im Leben einer Person gab. | D = Es gibt ein großes Problem. | E = Zwei Personen, die ein Paar waren, verstehen sich nicht mehr gut und gehen wieder eigene Wege.",
          type: "grid",
          rows: [
            "1. eine Krisensituation",
            "2. eine Trennung",
            "3. ein Todesfall",
            "4. ein Wendepunkt",
            "5. die Lebensgeschichte"
          ],
          columns: ["A", "B", "C", "D", "E"],
          correct: {
            "1. eine Krisensituation": "D",
            "2. eine Trennung": "E",
            "3. ein Todesfall": "A",
            "4. ein Wendepunkt": "B",
            "5. die Lebensgeschichte": "C"
          }
        },
        {
          id: "3b-b-1",
          prompt:
            "1C Begriffe. Welcher Begriff passt? Es gibt ein großes Problem. Optionen: eine Krisensituation / eine Trennung / ein Todesfall / ein Wendepunkt / die Lebensgeschichte",
          type: "text",
          correct: "eine Krisensituation"
        },
        {
          id: "3b-b-2",
          prompt:
            "1C Begriffe. Welcher Begriff passt? Zwei Personen gehen als Paar wieder getrennte Wege. Optionen: eine Krisensituation / eine Trennung / ein Todesfall / ein Wendepunkt / die Lebensgeschichte",
          type: "text",
          correct: "eine Trennung"
        },
        {
          id: "3b-b-3",
          prompt:
            "1C Begriffe. Welcher Begriff passt? Jemand ist gestorben. Optionen: eine Krisensituation / eine Trennung / ein Todesfall / ein Wendepunkt / die Lebensgeschichte",
          type: "text",
          correct: "ein Todesfall"
        },
        {
          id: "3b-b-4",
          prompt:
            "1C Begriffe. Welcher Begriff passt? Nach diesem Ereignis ist alles anders. Optionen: eine Krisensituation / eine Trennung / ein Todesfall / ein Wendepunkt / die Lebensgeschichte",
          type: "text",
          correct: "ein Wendepunkt"
        },
        {
          id: "3b-b-5",
          prompt:
            "1C Begriffe. Welcher Begriff passt? Alle wichtigen Ereignisse im Leben einer Person zusammen. Optionen: eine Krisensituation / eine Trennung / ein Todesfall / ein Wendepunkt / die Lebensgeschichte",
          type: "text",
          correct: "die Lebensgeschichte"
        }
      ]
    }
  }
},
} as const;
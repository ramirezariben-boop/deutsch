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

  "2A": {
    id: "2A",
    title: "Misión 2A",
    variants: {
      default: {
        title: "Mission 2A",
        shortDescription: "Versión del libro.",
        difficulty: 1,
        bonusMxp: 0,
        blocks: [
          {
            id: "2a-default-0",
            prompt: "2A-A. Lesen Sie den Text zu Sebastian Hilpert und ergänzen Sie die passenden Verben.",
            type: "grid",
            rows: [
              "1. sich nicht mehr glücklich ___",
              "2. andere berufliche Herausforderungen ___",
              "3. einen Bericht über ein Projekt ___",
              "4. das Leben aus einer anderen Perspektive ___",
              "5. ein Studium ___, aber nicht abschließen",
              "6. Erfahrungen mit Wildtieren ___",
              "7. anderen Menschen Mut ___"
            ],
            columns: [
              "fühlen",
              "suchen",
              "sehen",
              "kennenlernen",
              "ausprobieren",
              "sammeln",
              "machen"
            ],
            correct: {
              "1. sich nicht mehr glücklich ___": "fühlen",
              "2. andere berufliche Herausforderungen ___": "suchen",
              "3. einen Bericht über ein Projekt ___": "sehen",
              "4. das Leben aus einer anderen Perspektive ___": "kennenlernen",
              "5. ein Studium ___, aber nicht abschließen": "ausprobieren",
              "6. Erfahrungen mit Wildtieren ___": "sammeln",
              "7. anderen Menschen Mut ___": "machen"
            }
          },
          {
            id: "2a-default-1",
            prompt: "2A-B. Ein schrecklicher Unfall. Was ist richtig?",
            type: "checkbox_grid",
            rows: ["1. Kristina Vogel ..."],
            columns: [
              "war oft Erste bei großen Wettkämpfen.",
              "hatte einen schweren Unfall mit dem Auto.",
              "trainierte, als ein schwerer Unfall passierte."
            ],
            correct: {
              "1. Kristina Vogel ...": [
                "war oft Erste bei großen Wettkämpfen.",
                "trainierte, als ein schwerer Unfall passierte."
              ]
            }
          },
          {
            id: "2a-default-2",
            prompt: "2A-B. Ein schrecklicher Unfall. Was ist richtig?",
            type: "checkbox_grid",
            rows: ["2. Seit ihrem Unfall ..."],
            columns: [
              "braucht sie einen Rollstuhl.",
              "kann sie wieder viele Dinge allein machen.",
              "arbeitet sie im Krankenhaus."
            ],
            correct: {
              "2. Seit ihrem Unfall ...": [
                "braucht sie einen Rollstuhl.",
                "kann sie wieder viele Dinge allein machen."
              ]
            }
          },
          {
            id: "2a-default-3",
            prompt: "2A-B. Ein schrecklicher Unfall. Was ist richtig?",
            type: "checkbox_grid",
            rows: ["3. Schon ein Jahr später ..."],
            columns: [
              "hat sie mit ihrem Mann ein Kind bekommen.",
              "war sie neben ihrem Beruf auch Politikerin.",
              "arbeitete sie trotz ihres Unfalls in vielen Projekten mit."
            ],
            correct: {
              "3. Schon ein Jahr später ...": [
                "arbeitete sie trotz ihres Unfalls in vielen Projekten mit."
              ]
            }
          }
        ]
      },
      lebenswege: {
        title: "Mission 2A – Lebenswege",
        shortDescription: "Comprensión de las dos historias de cambio de vida.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2a-lebenswege-0",
            prompt: "Wer passt? Wählen Sie die richtige Person.",
            type: "grid",
            rows: [
              "1. war früher Berufssoldat.",
              "2. war Olympiasiegerin und mehrfache Weltmeisterin.",
              "3. lernte in Namibia das Leben aus einer anderen Perspektive kennen.",
              "4. sitzt seit einem Unfall im Rollstuhl.",
              "5. arbeitet heute auch als Fotograf und Buchautor.",
              "6. kann mittlerweile wieder allein Auto fahren.",
              "7. möchte anderen Menschen Mut machen.",
              "8. ist politisch engagiert und im Stadtrat aktiv."
            ],
            columns: ["Sebastian Hilpert", "Kristina Vogel"],
            correct: {
              "1. war früher Berufssoldat.": "Sebastian Hilpert",
              "2. war Olympiasiegerin und mehrfache Weltmeisterin.": "Kristina Vogel",
              "3. lernte in Namibia das Leben aus einer anderen Perspektive kennen.": "Sebastian Hilpert",
              "4. sitzt seit einem Unfall im Rollstuhl.": "Kristina Vogel",
              "5. arbeitet heute auch als Fotograf und Buchautor.": "Sebastian Hilpert",
              "6. kann mittlerweile wieder allein Auto fahren.": "Kristina Vogel",
              "7. möchte anderen Menschen Mut machen.": "Sebastian Hilpert",
              "8. ist politisch engagiert und im Stadtrat aktiv.": "Kristina Vogel"
            }
          }
        ]
      },
      zeiten: {
        title: "Mission 2A – Früher, danach, heute",
        shortDescription: "Ubicar hechos importantes de ambas biografías en su momento correcto.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2a-zeiten-0",
            prompt: "Wann passiert das in der Lebensgeschichte?",
            type: "grid",
            rows: [
              "1. Sebastian war Berufssoldat.",
              "2. Sebastian lernte in Namibia das Leben aus einer anderen Perspektive kennen.",
              "3. Sebastian arbeitet heute auch als Fotograf und Buchautor.",
              "4. Kristina war auf dem Höhepunkt ihrer Karriere.",
              "5. Kristina war nach dem Unfall eine Zeit lang im Krankenhaus.",
              "6. Kristina kann mittlerweile wieder allein Auto fahren.",
              "7. Kristina ist im Stadtrat Erfurt aktiv.",
              "8. Sebastian fährt regelmäßig nach Afrika."
            ],
            columns: ["früher", "danach", "heute"],
            correct: {
              "1. Sebastian war Berufssoldat.": "früher",
              "2. Sebastian lernte in Namibia das Leben aus einer anderen Perspektive kennen.": "danach",
              "3. Sebastian arbeitet heute auch als Fotograf und Buchautor.": "heute",
              "4. Kristina war auf dem Höhepunkt ihrer Karriere.": "früher",
              "5. Kristina war nach dem Unfall eine Zeit lang im Krankenhaus.": "danach",
              "6. Kristina kann mittlerweile wieder allein Auto fahren.": "heute",
              "7. Kristina ist im Stadtrat Erfurt aktiv.": "heute",
              "8. Sebastian fährt regelmäßig nach Afrika.": "heute"
            }
          }
        ]
      },
    }
  },

  "2B": {
    id: "2B",
    title: "Misión 2B",
    variants: {
      default: {
        title: "Mission 2B",
        shortDescription: "Versión del libro.",
        difficulty: 1,
        bonusMxp: 0,
        blocks: [
          {
            id: "2b-default-0",
            prompt: "4a. (1) Entschuldige, dass ich so lange nicht ___.",
            type: "text",
            correct: "geschrieben habe"
          },
          {
            id: "2b-default-1",
            prompt: "4a. (2) In meinem Leben ___ so viel ___.",
            type: "text",
            correct: "ist passiert"
          },
          {
            id: "2b-default-2",
            prompt: "4a. (3) Ich ___ immer gern in Berlin ___.",
            type: "text",
            correct: "habe gelebt"
          },
          {
            id: "2b-default-3",
            prompt: "4a. (4) Ich ___ nie ___, dass ich einmal aus Berlin wegziehe.",
            type: "text",
            correct: "habe gedacht"
          },
          {
            id: "2b-default-4",
            prompt: "4a. (5) Da ___ ich tatsächlich ___.",
            type: "text",
            correct: "bin umgezogen"
          },
          {
            id: "2b-default-5",
            prompt: "4a. (6) Eine Tante hatte dort ein Haus, das ich nun von ihr ___ ___.",
            type: "text",
            correct: "bekommen habe"
          },
          {
            id: "2b-default-6",
            prompt: "4a. (7) Meine Eltern und ich ___ das Haus komplett ___.",
            type: "text",
            correct: "haben renoviert"
          },
          {
            id: "2b-default-7",
            prompt: "4a. (8) Mein Bruder ___ auch viel ___.",
            type: "text",
            correct: "hat geholfen"
          },
          {
            id: "2b-default-8",
            prompt: "4a. (9) Vor vier Wochen ___ ich in das Haus ___.",
            type: "text",
            correct: "bin eingezogen"
          },
          {
            id: "2b-default-9",
            prompt: "4a. (10) Meine Stelle in Berlin ___ ich ___.",
            type: "text",
            correct: "habe gekündigt"
          },
          {
            id: "2b-default-10",
            prompt: "4a. (11) Gestern ___ ich hier schon einen neuen Job ___.",
            type: "text",
            correct: "habe begonnen"
          }
        ]
      },
      perfektformen: {
        title: "Mission 2B – Perfektformen",
        shortDescription: "Foco en auxiliares y participios del correo de Anna.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2b-perfekt-0",
            prompt: "Wählen Sie el auxiliar correcto.",
            type: "grid",
            rows: [
              "1. ... dass ich so lange nicht ___ geschrieben.",
              "2. In meinem Leben ___ so viel passiert.",
              "3. Ich ___ immer gern in Berlin gelebt.",
              "4. Ich ___ nie gedacht, dass ich einmal aus Berlin wegziehe.",
              "5. Da ___ ich tatsächlich umgezogen.",
              "6. ... das ich nun von ihr bekommen ___.",
              "7. Meine Eltern und ich ___ das Haus komplett renoviert.",
              "8. Mein Bruder ___ auch viel geholfen.",
              "9. Vor vier Wochen ___ ich in das Haus eingezogen.",
              "10. Meine Stelle in Berlin ___ ich gekündigt.",
              "11. Gestern ___ ich hier schon einen neuen Job begonnen."
            ],
            columns: ["habe", "hat", "ist", "bin", "haben"],
            correct: {
              "1. ... dass ich so lange nicht ___ geschrieben.": "habe",
              "2. In meinem Leben ___ so viel passiert.": "ist",
              "3. Ich ___ immer gern in Berlin gelebt.": "habe",
              "4. Ich ___ nie gedacht, dass ich einmal aus Berlin wegziehe.": "habe",
              "5. Da ___ ich tatsächlich umgezogen.": "bin",
              "6. ... das ich nun von ihr bekommen ___.": "habe",
              "7. Meine Eltern und ich ___ das Haus komplett renoviert.": "haben",
              "8. Mein Bruder ___ auch viel geholfen.": "hat",
              "9. Vor vier Wochen ___ ich in das Haus eingezogen.": "bin",
              "10. Meine Stelle in Berlin ___ ich gekündigt.": "habe",
              "11. Gestern ___ ich hier schon einen neuen Job begonnen.": "habe"
            }
          },
          {
            id: "2b-perfekt-1",
            prompt: "Wählen Sie el participio correcto.",
            type: "grid",
            rows: [
              "1. ... dass ich so lange nicht ___ habe.",
              "2. In meinem Leben ist so viel ___.",
              "3. Ich habe immer gern in Berlin ___.",
              "4. Ich habe nie ___, dass ich einmal aus Berlin wegziehe.",
              "5. Da bin ich tatsächlich ___.",
              "6. ... das ich nun von ihr ___ habe.",
              "7. Meine Eltern und ich haben das Haus komplett ___.",
              "8. Mein Bruder hat auch viel ___.",
              "9. Vor vier Wochen bin ich in das Haus ___.",
              "10. Meine Stelle in Berlin habe ich ___.",
              "11. Gestern habe ich hier schon einen neuen Job ___."
            ],
            columns: [
              "geschrieben",
              "passiert",
              "gelebt",
              "gedacht",
              "umgezogen",
              "bekommen",
              "renoviert",
              "geholfen",
              "eingezogen",
              "gekündigt",
              "begonnen"
            ],
            correct: {
              "1. ... dass ich so lange nicht ___ habe.": "geschrieben",
              "2. In meinem Leben ist so viel ___.": "passiert",
              "3. Ich habe immer gern in Berlin ___.": "gelebt",
              "4. Ich habe nie ___, dass ich einmal aus Berlin wegziehe.": "gedacht",
              "5. Da bin ich tatsächlich ___.": "umgezogen",
              "6. ... das ich nun von ihr ___ habe.": "bekommen",
              "7. Meine Eltern und ich haben das Haus komplett ___.": "renoviert",
              "8. Mein Bruder hat auch viel ___.": "geholfen",
              "9. Vor vier Wochen bin ich in das Haus ___.": "eingezogen",
              "10. Meine Stelle in Berlin habe ich ___.": "gekündigt",
              "11. Gestern habe ich hier schon einen neuen Job ___.": "begonnen"
            }
          }
        ]
      },
      verben: {
        title: "Mission 2B – Umzug",
        shortDescription: "Foco en los verbos base del correo sobre la mudanza y el nuevo comienzo.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2b-verben-0",
            prompt: "Wählen Sie das passende Verb aus der Liste.",
            type: "grid",
            rows: [
              "1. Entschuldige, dass ich so lange nicht ___.",
              "2. In meinem Leben ist so viel ___.",
              "3. Ich habe immer gern in Berlin ___.",
              "4. Ich habe nie ___, dass ich einmal aus Berlin wegziehe.",
              "5. Da bin ich tatsächlich ___.",
              "6. Eine Tante hatte dort ein Haus, das ich nun von ihr ___ habe.",
              "7. Meine Eltern und ich haben das Haus komplett ___.",
              "8. Mein Bruder hat auch viel ___.",
              "9. Vor vier Wochen bin ich in das Haus ___.",
              "10. Meine Stelle in Berlin habe ich ___.",
              "11. Gestern habe ich hier schon einen neuen Job ___."
            ],
            columns: [
              "schreiben",
              "passieren",
              "leben",
              "denken",
              "umziehen",
              "bekommen",
              "renovieren",
              "helfen",
              "einziehen",
              "kündigen",
              "beginnen"
            ],
            correct: {
              "1. Entschuldige, dass ich so lange nicht ___.": "schreiben",
              "2. In meinem Leben ist so viel ___.": "passieren",
              "3. Ich habe immer gern in Berlin ___.": "leben",
              "4. Ich habe nie ___, dass ich einmal aus Berlin wegziehe.": "denken",
              "5. Da bin ich tatsächlich ___.": "umziehen",
              "6. Eine Tante hatte dort ein Haus, das ich nun von ihr ___ habe.": "bekommen",
              "7. Meine Eltern und ich haben das Haus komplett ___.": "renovieren",
              "8. Mein Bruder hat auch viel ___.": "helfen",
              "9. Vor vier Wochen bin ich in das Haus ___.": "einziehen",
              "10. Meine Stelle in Berlin habe ich ___.": "kündigen",
              "11. Gestern habe ich hier schon einen neuen Job ___.": "beginnen"
            }
          }
        ]      
      },
    }
  },

  "2C": {
    id: "2C",
    title: "Misión 2C",
    variants: {
      default: {
        title: "Mission 2C",
        shortDescription: "Versión del libro.",
        difficulty: 1,
        bonusMxp: 0,
        blocks: [
          {
            id: "2c-default-0",
            prompt: "4b. 1a. Bernd Huller ___ Sportler.",
            type: "text",
            correct: "war"
          },
          {
            id: "2c-default-1",
            prompt: "4b. 1b. Er ___ eine erfolgreiche Karriere.",
            type: "text",
            correct: "hatte"
          },
          {
            id: "2c-default-2",
            prompt: "4b. 2. Aber dann wurde er schwer krank und ___ lang im Krankenhaus. Opciones válidas: hatte / war",
            type: "text",
            correct: "war"
          },
          {
            id: "2c-default-3",
            prompt: "4b. 3. Nach seiner Krankheit ___ er vieles in seinem Leben anders machen. Opciones válidas: konnte / musste",
            type: "text",
            correct: "musste"
          },
          {
            id: "2c-default-4",
            prompt: "4b. 4. Herr Huller ___ schnell wieder so selbstständig wie möglich sein. Opciones válidas: durfte / wollte",
            type: "text",
            correct: "wollte"
          },
          {
            id: "2c-default-5",
            prompt: "4b. 5. Ein Jahr später ___ er schon wieder Auto fahren und in Projekten arbeiten. Opciones válidas: konnte / sollte",
            type: "text",
            correct: "konnte"
          },
          {
            id: "2c-default-6",
            prompt: "4b. 6. Er ___ sich auch in einem Verein engagieren und ist dort sehr aktiv. Opciones válidas: durfte / wollte",
            type: "text",
            correct: "wollte"
          },
          {
            id: "2c-default-7",
            prompt: "4c. Welche Präteritumsform passt zum Infinitiv?",
            type: "grid",
            rows: [
              "anbieten",
              "arbeiten",
              "kündigen",
              "beginnen",
              "fahren",
              "besuchen",
              "treffen",
              "bleiben",
              "fliegen",
              "buchen",
              "sich entscheiden"
            ],
            columns: [
              "fuhr",
              "buchte",
              "bot ... an",
              "blieb",
              "begann",
              "traf",
              "kündigte",
              "flog",
              "entschied sich",
              "besuchte",
              "arbeitete"
            ],
            correct: {
              "anbieten": "bot ... an",
              "arbeiten": "arbeitete",
              "kündigen": "kündigte",
              "beginnen": "begann",
              "fahren": "fuhr",
              "besuchen": "besuchte",
              "treffen": "traf",
              "bleiben": "blieb",
              "fliegen": "flog",
              "buchen": "buchte",
              "sich entscheiden": "entschied sich"
            }
          },
          {
            id: "2c-default-8",
            prompt: "4c. Ergänzen Sie dann die Präteritumsformen im Text.",
            type: "grid",
            rows: [
              "1. Susanne Berger ___ an einem ganz normalen Tag im Herbst, ihr Leben zu ändern.",
              "2. Sie ___, so viel Geld wie möglich zu sparen.",
              "3. Damals ___ sie als Event-Managerin in einer großen Agentur.",
              "4. Ein Jahr später ___ sie ihren stressigen Job",
              "5. und ___ ein Ticket für eine lange Reise.",
              "6. Sie ___ nach Australien,",
              "7. wo sie zuerst für ein paar Wochen alte Schulfreunde ___.",
              "8. Von dort ___ sie dann mit einem Auto quer durch das Land.",
              "9. Sie ___ fast ein Jahr in Australien.",
              "10. Zurück in Deutschland ___ sie zufällig einen alten Freund.",
              "11. Er ___ ihr einen interessanten Job ___."
            ],
            columns: [
              "entschied sich",
              "begann",
              "arbeitete",
              "kündigte",
              "buchte",
              "flog",
              "besuchte",
              "fuhr",
              "blieb",
              "traf",
              "bot ... an"
            ],
            correct: {
              "1. Susanne Berger ___ an einem ganz normalen Tag im Herbst, ihr Leben zu ändern.": "entschied sich",
              "2. Sie ___, so viel Geld wie möglich zu sparen.": "begann",
              "3. Damals ___ sie als Event-Managerin in einer großen Agentur.": "arbeitete",
              "4. Ein Jahr später ___ sie ihren stressigen Job": "kündigte",
              "5. und ___ ein Ticket für eine lange Reise.": "buchte",
              "6. Sie ___ nach Australien,": "flog",
              "7. wo sie zuerst für ein paar Wochen alte Schulfreunde ___.": "besuchte",
              "8. Von dort ___ sie dann mit einem Auto quer durch das Land.": "fuhr",
              "9. Sie ___ fast ein Jahr in Australien.": "blieb",
              "10. Zurück in Deutschland ___ sie zufällig einen alten Freund.": "traf",
              "11. Er ___ ihr einen interessanten Job ___.": "bot ... an"
            }
          }
        ]
      },
      lebenswege: {
        title: "Mission 2C – Lebenswege",
        shortDescription: "Comprensión de los cambios de vida de Bernd Huller y Susanne Berger.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2c-lebenswege-0",
            prompt: "Wer passt? Wählen Sie die richtige Person.",
            type: "grid",
            rows: [
              "1. war früher sehr erfolgreich im Sport.",
              "2. wurde schwer krank und musste vieles in seinem Leben verändern.",
              "3. entschied sich an einem Herbsttag, ihr Leben zu ändern.",
              "4. kündigte ihren stressigen Job.",
              "5. blieb fast ein Jahr in Australien.",
              "6. wollte schnell wieder selbstständig sein.",
              "7. konnte später wieder Auto fahren und in Projekten arbeiten.",
              "8. engagiert sich auch in einem Verein.",
              "9. traf in Deutschland zufällig einen alten Freund.",
              "10. bekam durch einen alten Freund ein interessantes Jobangebot."
            ],
            columns: ["Bernd Huller", "Susanne Berger"],
            correct: {
              "1. war früher sehr erfolgreich im Sport.": "Bernd Huller",
              "2. wurde schwer krank und musste vieles in seinem Leben verändern.": "Bernd Huller",
              "3. entschied sich an einem Herbsttag, ihr Leben zu ändern.": "Susanne Berger",
              "4. kündigte ihren stressigen Job.": "Susanne Berger",
              "5. blieb fast ein Jahr in Australien.": "Susanne Berger",
              "6. wollte schnell wieder selbstständig sein.": "Bernd Huller",
              "7. konnte später wieder Auto fahren und in Projekten arbeiten.": "Bernd Huller",
              "8. engagiert sich auch in einem Verein.": "Bernd Huller",
              "9. traf in Deutschland zufällig einen alten Freund.": "Susanne Berger",
              "10. bekam durch einen alten Freund ein interessantes Jobangebot.": "Susanne Berger"
            }
          }
        ]
      },
      praeteritumformen: {
        title: "Mission 2C – Präteritumformen",
        shortDescription: "Foco en las formas de Präteritum y en su uso dentro del relato.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2c-praet-0",
            prompt: "Ordnen Sie den Infinitiven die passende Präteritumsform zu.",
            type: "grid",
            rows: [
              "anbieten",
              "arbeiten",
              "kündigen",
              "beginnen",
              "fahren",
              "besuchen",
              "treffen",
              "bleiben",
              "fliegen",
              "buchen",
              "sich entscheiden"
            ],
            columns: [
              "fuhr",
              "buchte",
              "bot ... an",
              "blieb",
              "begann",
              "traf",
              "kündigte",
              "flog",
              "entschied sich",
              "besuchte",
              "arbeitete"
            ],
            correct: {
              "anbieten": "bot ... an",
              "arbeiten": "arbeitete",
              "kündigen": "kündigte",
              "beginnen": "begann",
              "fahren": "fuhr",
              "besuchen": "besuchte",
              "treffen": "traf",
              "bleiben": "blieb",
              "fliegen": "flog",
              "buchen": "buchte",
              "sich entscheiden": "entschied sich"
            }
          },
          {
            id: "2c-praet-1",
            prompt: "Wählen Sie die passende Präteritumsform für den Text.",
            type: "grid",
            rows: [
              "1. Susanne Berger ___ an einem ganz normalen Tag im Herbst, ihr Leben zu ändern.",
              "2. Sie ___, so viel Geld wie möglich zu sparen.",
              "3. Damals ___ sie als Event-Managerin in einer großen Agentur.",
              "4. Ein Jahr später ___ sie ihren stressigen Job.",
              "5. Und sie ___ ein Ticket für eine lange Reise.",
              "6. Sie ___ nach Australien.",
              "7. Dort ___ sie zuerst für ein paar Wochen alte Schulfreunde.",
              "8. Von dort ___ sie dann mit einem Auto quer durch das Land.",
              "9. Sie ___ fast ein Jahr in Australien.",
              "10. Zurück in Deutschland ___ sie zufällig einen alten Freund.",
              "11. Er ___ ihr einen interessanten Job ___."
            ],
            columns: [
              "entschied sich",
              "begann",
              "arbeitete",
              "kündigte",
              "buchte",
              "flog",
              "besuchte",
              "fuhr",
              "blieb",
              "traf",
              "bot ... an"
            ],
            correct: {
              "1. Susanne Berger ___ an einem ganz normalen Tag im Herbst, ihr Leben zu ändern.": "entschied sich",
              "2. Sie ___, so viel Geld wie möglich zu sparen.": "begann",
              "3. Damals ___ sie als Event-Managerin in einer großen Agentur.": "arbeitete",
              "4. Ein Jahr später ___ sie ihren stressigen Job.": "kündigte",
              "5. Und sie ___ ein Ticket für eine lange Reise.": "buchte",
              "6. Sie ___ nach Australien.": "flog",
              "7. Dort ___ sie zuerst für ein paar Wochen alte Schulfreunde.": "besuchte",
              "8. Von dort ___ sie dann mit einem Auto quer durch das Land.": "fuhr",
              "9. Sie ___ fast ein Jahr in Australien.": "blieb",
              "10. Zurück in Deutschland ___ sie zufällig einen alten Freund.": "traf",
              "11. Er ___ ihr einen interessanten Job ___.": "bot ... an"
            }
          }
        ]
      },
    }
  },
} as const;
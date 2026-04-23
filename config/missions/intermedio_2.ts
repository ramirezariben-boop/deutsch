// config/missions/intermedio_2.ts
export const MISSIONS_INTERMEDIO_2 = {
"1A": {
  id: "1A",
  title: "Misión 1A",
  variants: {
    default: {
      title: "Mission 1A",
      shortDescription:
        "Versión del libro: completar vocabulario y elegir el equipo adecuado para cada plan.",
      difficulty: 1,
      bonusMxp: 0,
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
          prompt: "1b. Was brauchen die Personen für ihren Urlaub? Kreuzen Sie die passenden Dinge an.",
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

    wortschatz: {
      title: "Mission 1A – Wortschatz",
      shortDescription:
        "Clasifica y reconoce el léxico central de Natur & Urlaub en distintos contextos.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "1a-w-0",
          prompt: "1A Wortschatz. Ordnen Sie die Wörter der passenden Kategorie zu.",
          type: "grid",
          rows: [
            "der Pilz",
            "giftig",
            "das Insekt",
            "im Freien übernachten",
            "das Netz",
            "der Himmel",
            "faulenzen"
          ],
          columns: [
            "Nomen",
            "Adjektiv",
            "Verb / Wendung"
          ],
          correct: {
            "der Pilz": "Nomen",
            "giftig": "Adjektiv",
            "das Insekt": "Nomen",
            "im Freien übernachten": "Verb / Wendung",
            "das Netz": "Nomen",
            "der Himmel": "Nomen",
            "faulenzen": "Verb / Wendung"
          }
        },
        {
          id: "1a-w-1",
          prompt: "1A Wortschatz. Welche Formulierung passt am besten?",
          type: "grid",
          rows: [
            "Man sieht ihn über sich; dort sind Sonne und Wolken.",
            "Damit schützt man sich am Zelteingang.",
            "So nennt man Tiere, vor denen man im Sommer oft Schutz braucht.",
            "Das ist draußen nachts schlafen, nicht im Hotel.",
            "Das macht man gern im Urlaub, wenn man einfach nur ruht.",
            "So beschreibt man etwas, das gefährlich sein kann.",
            "Man sammelt sie im Herbst im Wald."
          ],
          columns: [
            "der Pilz",
            "giftig",
            "das Insekt",
            "im Freien übernachten",
            "das Netz",
            "der Himmel",
            "faulenzen"
          ],
          correct: {
            "Man sieht ihn über sich; dort sind Sonne und Wolken.": "der Himmel",
            "Damit schützt man sich am Zelteingang.": "das Netz",
            "So nennt man Tiere, vor denen man im Sommer oft Schutz braucht.": "das Insekt",
            "Das ist draußen nachts schlafen, nicht im Hotel.": "im Freien übernachten",
            "Das macht man gern im Urlaub, wenn man einfach nur ruht.": "faulenzen",
            "So beschreibt man etwas, das gefährlich sein kann.": "giftig",
            "Man sammelt sie im Herbst im Wald.": "der Pilz"
          }
        }
      ]
    },

    ausruestung: {
      title: "Mission 1A – Ausrüstung",
      shortDescription:
        "Relaciona actividades de vacaciones con objetos útiles y decide qué plan corresponde a cada situación.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "1a-a-0",
          prompt: "1A Ausrüstung. Was braucht man für welche Aktivität? Kreuzen Sie an.",
          type: "checkbox_grid",
          rows: [
            "eine Bootstour machen",
            "Surfen an der Ostsee",
            "im Zelt übernachten"
          ],
          columns: [
            "Sonnencreme",
            "Schlafsack",
            "Bücher",
            "Spiele",
            "Regenkleidung",
            "Sonnenbrille (mit Band)",
            "Tropfen für die Augen / Augentropfen",
            "Netz"
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
            ],
            "im Zelt übernachten": [
              "Schlafsack",
              "Netz"
            ]
          }
        },
        {
          id: "1a-a-1",
          prompt: "1A Ausrüstung. Welche Aktivität passt zu jeder Situation?",
          type: "grid",
          rows: [
            "Bücher, Spiele und Sonnencreme sind wichtig.",
            "Regenkleidung, Sonnenbrille und Augentropfen sind praktisch.",
            "Schlafsack und Netz sind am wichtigsten.",
            "Hier ist das Wetter oft windig und nass.",
            "Hier will man nachts Schutz gegen Insekten."
          ],
          columns: [
            "eine Bootstour machen",
            "Surfen an der Ostsee",
            "im Zelt übernachten"
          ],
          correct: {
            "Bücher, Spiele und Sonnencreme sind wichtig.": "eine Bootstour machen",
            "Regenkleidung, Sonnenbrille und Augentropfen sind praktisch.": "Surfen an der Ostsee",
            "Schlafsack und Netz sind am wichtigsten.": "im Zelt übernachten",
            "Hier ist das Wetter oft windig und nass.": "Surfen an der Ostsee",
            "Hier will man nachts Schutz gegen Insekten.": "im Zelt übernachten"
          }
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
      shortDescription:
        "Versión del libro: elegir la palabra que mejor completa los dos textos de vacaciones.",
      difficulty: 1,
      bonusMxp: 0,
      blocks: [
        {
          id: "1b-d-0",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (1) Das ___ jedenfalls nicht. Optionen: stimmt / klingt",
          type: "text",
          correct: "stimmt"
        },
        {
          id: "1b-d-1",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (2) ... wenn man hier in Norwegen ___ ist. Optionen: unterwegs / überall",
          type: "text",
          correct: "unterwegs"
        },
        {
          id: "1b-d-2",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (3) ... das kann doch nicht ___ sein. Optionen: klar / wahr",
          type: "text",
          correct: "wahr"
        },
        {
          id: "1b-d-3",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (4) Am ersten Tag haben wir noch ___. Optionen: gedacht / gelacht",
          type: "text",
          correct: "gelacht"
        },
        {
          id: "1b-d-4",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (5) ... aber heute ist die ___ schon groß. Optionen: Entscheidung / Enttäuschung",
          type: "text",
          correct: "Enttäuschung"
        },
        {
          id: "1b-d-5",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (6) Noch eine Nacht im Zelt, das ___ wir nicht. Optionen: dürfen / wollen",
          type: "text",
          correct: "wollen"
        },
        {
          id: "1b-d-6",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (7) Heute ___ wir in einem netten, kleinen Hotel. Optionen: essen / übernachten",
          type: "text",
          correct: "übernachten"
        },
        {
          id: "1b-d-7",
          prompt: "2. Berichte aus dem Urlaub. Text 1. (8) Aber ___ für morgen ist gut. Kein Regen! Optionen: der Wetterbericht / die Nachricht",
          type: "text",
          correct: "der Wetterbericht"
        },
        {
          id: "1b-d-8",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (9) Wir finden das ___. Optionen: langweilig / entspannend",
          type: "text",
          correct: "entspannend"
        },
        {
          id: "1b-d-9",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (10) ... drei Tage lang nur Wasser und ___. Optionen: Umgebung / Natur",
          type: "text",
          correct: "Natur"
        },
        {
          id: "1b-d-10",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (11) Im Urlaub ist diese Ruhe ___. Optionen: einsam / wunderbar",
          type: "text",
          correct: "wunderbar"
        },
        {
          id: "1b-d-11",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (12) Gestern Abend waren wir in einem ___ Restaurant. Optionen: gemütlichen / gemeinsamen",
          type: "text",
          correct: "gemütlichen"
        },
        {
          id: "1b-d-12",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (13) ... und wir haben nette Leute ___. Optionen: getroffen / gefunden",
          type: "text",
          correct: "getroffen"
        },
        {
          id: "1b-d-13",
          prompt: "2. Berichte aus dem Urlaub. Text 2. (14) Sie wollen uns ein paar besonders schöne Orte ___. Optionen: helfen / zeigen",
          type: "text",
          correct: "zeigen"
        }
      ]
    },

    regen: {
      title: "Mission 1B – Regen & Reaktion",
      shortDescription:
        "Variante centrada en el Texto 1: clima, incomodidad, reacción y cambio de planes.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "1b-r-0",
          prompt: "1B Regen. Text 1. (1) Das ___ jedenfalls nicht. Optionen: stimmt / klingt",
          type: "text",
          correct: "stimmt"
        },
        {
          id: "1b-r-1",
          prompt: "1B Regen. Text 1. (2) ... wenn man hier in Norwegen ___ ist. Optionen: unterwegs / überall",
          type: "text",
          correct: "unterwegs"
        },
        {
          id: "1b-r-2",
          prompt: "1B Regen. Text 1. (3) ... das kann doch nicht ___ sein. Optionen: klar / wahr",
          type: "text",
          correct: "wahr"
        },
        {
          id: "1b-r-3",
          prompt: "1B Regen. Text 1. (4) Am ersten Tag haben wir noch ___. Optionen: gedacht / gelacht",
          type: "text",
          correct: "gelacht"
        },
        {
          id: "1b-r-4",
          prompt: "1B Regen. Text 1. (5) ... aber heute ist die ___ schon groß. Optionen: Entscheidung / Enttäuschung",
          type: "text",
          correct: "Enttäuschung"
        },
        {
          id: "1b-r-5",
          prompt: "1B Regen. Text 1. (6) Noch eine Nacht im Zelt, das ___ wir nicht. Optionen: dürfen / wollen",
          type: "text",
          correct: "wollen"
        },
        {
          id: "1b-r-6",
          prompt: "1B Regen. Text 1. (7) Heute ___ wir in einem netten, kleinen Hotel. Optionen: essen / übernachten",
          type: "text",
          correct: "übernachten"
        },
        {
          id: "1b-r-7",
          prompt: "1B Regen. Text 1. (8) Aber ___ für morgen ist gut. Kein Regen! Optionen: der Wetterbericht / die Nachricht",
          type: "text",
          correct: "der Wetterbericht"
        },
        {
          id: "1b-r-8",
          prompt: "1B Regen. Welches Wort passt zur Definition? Information über das Wetter für morgen.",
          type: "text",
          correct: "der Wetterbericht"
        },
        {
          id: "1b-r-9",
          prompt: "1B Regen. Welches Wort passt zur Definition? Man ist nicht zu Hause, sondern auf dem Weg oder auf Reise.",
          type: "text",
          correct: "unterwegs"
        },
        {
          id: "1b-r-10",
          prompt: "1B Regen. Welches Wort passt zur Definition? Gefühl, wenn etwas schlechter sale de lo esperado.",
          type: "text",
          correct: "Enttäuschung"
        },
        {
          id: "1b-r-11",
          prompt: "1B Regen. Welches Wort passt zur Definition? Dormir o pasar la noche en un lugar.",
          type: "text",
          correct: "übernachten"
        }
      ]
    },

    ruhe: {
      title: "Mission 1B – Ruhe & Natur",
      shortDescription:
        "Variante centrada en el Texto 2: descanso, naturaleza, ambiente agradable y encuentros durante el viaje.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "1b-u-0",
          prompt: "1B Ruhe. Text 2. (9) Wir finden das ___. Optionen: langweilig / entspannend",
          type: "text",
          correct: "entspannend"
        },
        {
          id: "1b-u-1",
          prompt: "1B Ruhe. Text 2. (10) ... drei Tage lang nur Wasser und ___. Optionen: Umgebung / Natur",
          type: "text",
          correct: "Natur"
        },
        {
          id: "1b-u-2",
          prompt: "1B Ruhe. Text 2. (11) Im Urlaub ist diese Ruhe ___. Optionen: einsam / wunderbar",
          type: "text",
          correct: "wunderbar"
        },
        {
          id: "1b-u-3",
          prompt: "1B Ruhe. Text 2. (12) Gestern Abend waren wir in einem ___ Restaurant. Optionen: gemütlichen / gemeinsamen",
          type: "text",
          correct: "gemütlichen"
        },
        {
          id: "1b-u-4",
          prompt: "1B Ruhe. Text 2. (13) ... und wir haben nette Leute ___. Optionen: getroffen / gefunden",
          type: "text",
          correct: "getroffen"
        },
        {
          id: "1b-u-5",
          prompt: "1B Ruhe. Text 2. (14) Sie wollen uns ein paar besonders schöne Orte ___. Optionen: helfen / zeigen",
          type: "text",
          correct: "zeigen"
        },
        {
          id: "1b-u-6",
          prompt: "1B Ruhe. Welches Wort passt zur Definition? Algo que relaja y quita tensión.",
          type: "text",
          correct: "entspannend"
        },
        {
          id: "1b-u-7",
          prompt: "1B Ruhe. Welches Wort passt zur Definition? Paisaje natural; no ciudad, sino mundo natural.",
          type: "text",
          correct: "Natur"
        },
        {
          id: "1b-u-8",
          prompt: "1B Ruhe. Welches Wort passt zur Definition? Agradable, cómodo, con buena atmósfera.",
          type: "text",
          correct: "gemütlichen"
        },
        {
          id: "1b-u-9",
          prompt: "1B Ruhe. Welches Wort passt zur Definition? Ver o coincidir con personas durante un viaje.",
          type: "text",
          correct: "getroffen"
        },
        {
          id: "1b-u-10",
          prompt: "1B Ruhe. Welches Wort passt zur Definition? Enseñar lugares a otra persona.",
          type: "text",
          correct: "zeigen"
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
      shortDescription:
        "Versión del libro: relaciona los textos con la mejor Überschrift.",
      difficulty: 1,
      bonusMxp: 0,
      blocks: [
        {
          id: "1c-d-0",
          prompt: "3. Rund um den Urlaub. Lesen Sie die Überschriften (A–J) und die Texte (1–5). Schreiben Sie den passenden Buchstaben in die Tabelle. A = Neun Tage Urlaub im Jahr sind genug | B = Immer weniger Deutsche fahren nach Mallorca | C = Kinder erleben Alltag auf dem Bauernhof | D = Urlaub im eigenen Land ist am beliebtesten | E = Frühes Buchen ist am billigsten | F = Lieber mehr kürzere Urlaube als einen langen | G = Mit Schulkindern wird der Urlaub teurer | H = Kinder lernen alles über Tiere | I = Wer früh bucht, der hat die Wahl | J = Billig reisen auch in der Hauptsaison",
          type: "grid",
          rows: [
            "Text 1",
            "Text 2",
            "Text 3",
            "Text 4",
            "Text 5"
          ],
          columns: [
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
          correct: {
            "Text 1": "C",
            "Text 2": "F",
            "Text 3": "I",
            "Text 4": "G",
            "Text 5": "D"
          }
        }
      ]
    },

    kernaussagen: {
      title: "Mission 1C – Kernaussagen",
      shortDescription:
        "Variante centrada en la idea principal de cada texto: relaciona paráfrasis y conclusiones con la Überschrift correcta.",
      difficulty: 2,
      bonusMxp: 4,
      blocks: [
        {
          id: "1c-k-0",
          prompt: "1C Kernaussagen. Welche Überschrift passt zur Kernaussage?",
          type: "grid",
          rows: [
            "Kinder können auf einem Bauernhof den Alltag auf dem Land kennenlernen.",
            "Viele Menschen machen lieber mehrere kurze Reisen statt nur einer langen.",
            "Wer früh reserviert, hat bei Termin und Ziel mehr Auswahl.",
            "Familien mit Schulkindern müssen im Sommer oft besonders viel bezahlen.",
            "Viele Deutsche machen am liebsten Urlaub im eigenen Land."
          ],
          columns: [
            "C",
            "D",
            "F",
            "G",
            "I"
          ],
          correct: {
            "Kinder können auf einem Bauernhof den Alltag auf dem Land kennenlernen.": "C",
            "Viele Menschen machen lieber mehrere kurze Reisen statt nur einer langen.": "F",
            "Wer früh reserviert, hat bei Termin und Ziel mehr Auswahl.": "I",
            "Familien mit Schulkindern müssen im Sommer oft besonders viel bezahlen.": "G",
            "Viele Deutsche machen am liebsten Urlaub im eigenen Land.": "D"
          }
        },
        {
          id: "1c-k-1",
          prompt: "1C Kernaussagen. Früh buchen bedeutet vor allem: Schreiben Sie den Buchstaben. Optionen: C / D / F / G / I",
          type: "text",
          correct: "I"
        },
        {
          id: "1c-k-2",
          prompt: "1C Kernaussagen. Urlaub im eigenen Land ist besonders beliebt: Schreiben Sie den Buchstaben. Optionen: C / D / F / G / I",
          type: "text",
          correct: "D"
        },
        {
          id: "1c-k-3",
          prompt: "1C Kernaussagen. Mehrere kürzere Reisen statt eines langen Urlaubs: Schreiben Sie den Buchstaben. Optionen: C / D / F / G / I",
          type: "text",
          correct: "F"
        }
      ]
    },

    situationen: {
      title: "Mission 1C – Situationen",
      shortDescription:
        "Variante aplicada: decide qué Überschrift corresponde mejor a cada caso concreto de viaje, familia o reserva.",
      difficulty: 3,
      bonusMxp: 8,
      blocks: [
        {
          id: "1c-s-0",
          prompt: "1C Situationen. Eine Familie mit zwei Schulkindern will im Juli verreisen und merkt, dass alles besonders teuer ist. Welcher Buchstabe passt? Optionen: C / D / F / G / I",
          type: "text",
          correct: "G"
        },
        {
          id: "1c-s-1",
          prompt: "1C Situationen. Jemand reserviert Monate im Voraus, weil er bei Termin und Reiseziel möglichst viel Auswahl haben möchte. Welcher Buchstabe passt? Optionen: C / D / F / G / I",
          type: "text",
          correct: "I"
        },
        {
          id: "1c-s-2",
          prompt: "1C Situationen. Eine Person sagt: Zwei Wochen am Stück sind mir zu viel; ich mache lieber mehrere kürzere Reisen. Welcher Buchstabe passt? Optionen: C / D / F / G / I",
          type: "text",
          correct: "F"
        },
        {
          id: "1c-s-3",
          prompt: "1C Situationen. Kinder sollen Tiere sehen und lernen, wie das Leben und die Arbeit auf dem Land wirklich sind. Welcher Buchstabe passt? Optionen: C / D / F / G / I",
          type: "text",
          correct: "C"
        },
        {
          id: "1c-s-4",
          prompt: "1C Situationen. Eine Person bleibt lieber im eigenen Land, weil es günstiger ist und man die Sprache schon kennt. Welcher Buchstabe passt? Optionen: C / D / F / G / I",
          type: "text",
          correct: "D"
        },
        {
          id: "1c-s-5",
          prompt: "1C Situationen. Welche Überschrift passt zur Situation?",
          type: "grid",
          rows: [
            "Kinder erleben direkt das Leben auf einem Bauernhof.",
            "Früh reservieren bringt vor allem bessere Auswahl.",
            "Viele bevorzugen mehrere kurze Urlaube pro Jahr.",
            "Mit Schulkindern reist man in der Hochsaison teurer.",
            "Im eigenen Land fühlen sich viele sicherer und zahlen oft weniger."
          ],
          columns: [
            "C",
            "D",
            "F",
            "G",
            "I"
          ],
          correct: {
            "Kinder erleben direkt das Leben auf einem Bauernhof.": "C",
            "Früh reservieren bringt vor allem bessere Auswahl.": "I",
            "Viele bevorzugen mehrere kurze Urlaube pro Jahr.": "F",
            "Mit Schulkindern reist man in der Hochsaison teurer.": "G",
            "Im eigenen Land fühlen sich viele sicherer und zahlen oft weniger.": "D"
          }
        }
      ]
    }
  }
},
} as const;
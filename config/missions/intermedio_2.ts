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
            prompt: "4b. planen. Modalverb im Präteritum: Anna und Paula ___ ihren Urlaub planen.",
            type: "text",
            correct: "wollten",
          },
          {
            id: "2a-default-1",
            prompt: "4b. planen. Verb: Anna und Paula wollten ihren Urlaub ___.",
            type: "text",
            correct: "planen",
          },
          {
            id: "2a-default-2",
            prompt: "4b. finden. Modalverb im Präteritum: Anna und Paula ___ keine gemeinsame Lösung finden.",
            type: "text",
            correct: "konnten",
          },
          {
            id: "2a-default-3",
            prompt: "4b. finden. Verb: Anna und Paula konnten keine gemeinsame Lösung ___.",
            type: "text",
            correct: "finden",
          },
          {
            id: "2a-default-4",
            prompt: "4b. erholen. Modalverb im Präteritum: Paula ___ sich im Urlaub einfach nur erholen.",
            type: "text",
            correct: "wollte",
          },
          {
            id: "2a-default-5",
            prompt: "4b. erholen. Verb: Paula wollte sich im Urlaub einfach nur ___.",
            type: "text",
            correct: "erholen",
          },
          {
            id: "2a-default-6",
            prompt: "4b. unternehmen. Modalverb im Präteritum: Anna ___ lieber ganz viel unternehmen: Kultur, Ausgehen, Sport.",
            type: "text",
            correct: "wollte",
          },
          {
            id: "2a-default-7",
            prompt: "4b. unternehmen. Verb: Anna wollte lieber ganz viel ___: Kultur, Ausgehen, Sport.",
            type: "text",
            correct: "unternehmen",
          },
          {
            id: "2a-default-8",
            prompt: "4b. entscheiden. Modalverb im Präteritum: Aber sie ___ sich entscheiden, weil sie schon bald Urlaub hatten.",
            type: "text",
            correct: "mussten",
          },
          {
            id: "2a-default-9",
            prompt: "4b. entscheiden. Verb: Aber sie mussten sich ___, weil sie schon bald Urlaub hatten.",
            type: "text",
            correct: "entscheiden",
          },
          {
            id: "2a-default-10",
            prompt: "4b. helfen. Modalverb im Präteritum: Der Mann im Reisebüro ___ ihnen mit guten Tipps helfen.",
            type: "text",
            correct: "konnte",
          },
          {
            id: "2a-default-11",
            prompt: "4b. helfen. Verb: Der Mann im Reisebüro konnte ihnen mit guten Tipps ___.",
            type: "text",
            correct: "helfen",
          },
          {
            id: "2a-default-12",
            prompt: "4b. suchen. Modalverb im Präteritum: Aber er ___ lange nach einem passenden Angebot suchen.",
            type: "text",
            correct: "musste",
          },
          {
            id: "2a-default-13",
            prompt: "4b. suchen. Verb: Aber er musste lange nach einem passenden Angebot ___.",
            type: "text",
            correct: "suchen",
          },
        ],
      },
      modalverben: {
        title: "Mission 2A – Modalverben",
        shortDescription: "Foco en las formas de Präteritum y en los infinitivos del ejercicio.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2a-modal-0",
            prompt: "Wählen Sie das passende Modalverb im Präteritum.",
            type: "grid",
            rows: [
              "1. Anna und Paula ___ ihren Urlaub planen.",
              "2. Anna und Paula ___ keine gemeinsame Lösung finden.",
              "3. Paula ___ sich im Urlaub einfach nur erholen.",
              "4. Anna ___ lieber ganz viel unternehmen.",
              "5. Aber sie ___ sich entscheiden, weil sie schon bald Urlaub hatten.",
              "6. Der Mann im Reisebüro ___ ihnen mit guten Tipps helfen.",
              "7. Aber er ___ lange nach einem passenden Angebot suchen.",
            ],
            columns: ["wollte", "wollten", "konnte", "konnten", "musste", "mussten"],
            correct: {
              "1. Anna und Paula ___ ihren Urlaub planen.": "wollten",
              "2. Anna und Paula ___ keine gemeinsame Lösung finden.": "konnten",
              "3. Paula ___ sich im Urlaub einfach nur erholen.": "wollte",
              "4. Anna ___ lieber ganz viel unternehmen.": "wollte",
              "5. Aber sie ___ sich entscheiden, weil sie schon bald Urlaub hatten.": "mussten",
              "6. Der Mann im Reisebüro ___ ihnen mit guten Tipps helfen.": "konnte",
              "7. Aber er ___ lange nach einem passenden Angebot suchen.": "musste",
            },
          },
          {
            id: "2a-modal-1",
            prompt: "Wählen Sie den passenden Infinitiv.",
            type: "grid",
            rows: [
              "1. Anna und Paula wollten ihren Urlaub ___.",
              "2. Anna und Paula konnten keine gemeinsame Lösung ___.",
              "3. Paula wollte sich im Urlaub einfach nur ___.",
              "4. Anna wollte lieber ganz viel ___.",
              "5. Aber sie mussten sich ___.",
              "6. Der Mann im Reisebüro konnte ihnen mit guten Tipps ___.",
              "7. Aber er musste lange nach einem passenden Angebot ___.",
            ],
            columns: ["planen", "finden", "erholen", "unternehmen", "entscheiden", "helfen", "suchen"],
            correct: {
              "1. Anna und Paula wollten ihren Urlaub ___.": "planen",
              "2. Anna und Paula konnten keine gemeinsame Lösung ___.": "finden",
              "3. Paula wollte sich im Urlaub einfach nur ___.": "erholen",
              "4. Anna wollte lieber ganz viel ___.": "unternehmen",
              "5. Aber sie mussten sich ___.": "entscheiden",
              "6. Der Mann im Reisebüro konnte ihnen mit guten Tipps ___.": "helfen",
              "7. Aber er musste lange nach einem passenden Angebot ___.": "suchen",
            },
          },
        ],
      },
      urlaubsrollen: {
        title: "Mission 2A – Urlaubsrollen",
        shortDescription: "Quién quiere qué y quién ayuda en la planificación del viaje.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2a-rollen-0",
            prompt: "Wer passt? Wählen Sie die richtige Person oder Gruppe.",
            type: "grid",
            rows: [
              "1. wollte den Urlaub planen.",
              "2. wollte sich im Urlaub einfach nur erholen.",
              "3. wollte lieber ganz viel unternehmen.",
              "4. konnten keine gemeinsame Lösung finden.",
              "5. mussten sich schnell entscheiden.",
              "6. konnte mit guten Tipps helfen.",
              "7. musste lange nach einem passenden Angebot suchen."
            ],
            columns: ["Anna", "Paula", "Anna und Paula", "Der Mann im Reisebüro"],
            correct: {
              "1. wollte den Urlaub planen.": "Anna und Paula",
              "2. wollte sich im Urlaub einfach nur erholen.": "Paula",
              "3. wollte lieber ganz viel unternehmen.": "Anna",
              "4. konnten keine gemeinsame Lösung finden.": "Anna und Paula",
              "5. mussten sich schnell entscheiden.": "Anna und Paula",
              "6. konnte mit guten Tipps helfen.": "Der Mann im Reisebüro",
              "7. musste lange nach einem passenden Angebot suchen.": "Der Mann im Reisebüro"
            }
          }
        ]
      },    
    },
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
            prompt: "4c. 1. a = Anna und Paula haben keine Lust, ... | b = Anna und Paula finden es schwer, ... ... einen gemeinsamen Urlaub zu planen.",
            type: "text",
            correct: "b",
          },
          {
            id: "2b-default-1",
            prompt: "4c. 2. a = Für Anna ist es wichtig, ... | b = Anna findet es total anstrengend, ... ... im Urlaub viel zu unternehmen.",
            type: "text",
            correct: "a",
          },
          {
            id: "2b-default-2",
            prompt: "4c. 3. a = Paula macht es keinen Spaß, ... | b = Paula hat vor allem vor, ... ... sich im Urlaub gut zu erholen.",
            type: "text",
            correct: "b",
          },
          {
            id: "2b-default-3",
            prompt: "4c. 4. a = Die beiden Freundinnen versuchen, ... | b = Für Anna und Paula ist es nicht wichtig, ... ... ein Angebot für beide zu finden.",
            type: "text",
            correct: "a",
          },
          {
            id: "2b-default-4",
            prompt: "4c. 5. a = Anna hat erst am nächsten Tag Zeit, ... | b = Anna hat vergessen, ... ... mit Paula ins Reisebüro zu gehen.",
            type: "text",
            correct: "a",
          },
          {
            id: "2b-default-5",
            prompt: "4d. (1) Ich ___, heute um 7 ins Fitness-Studio zu gehen. Kommst du mit?",
            type: "text",
            correct: "habe vor",
          },
          {
            id: "2b-default-6",
            prompt: "4d. (2) Super Idee. Ich ___, auch zu kommen. Geht halb 8 auch?",
            type: "text",
            correct: "versuche",
          },
          {
            id: "2b-default-7",
            prompt: "4d. (3) Was machen wir? Es ___, zu regnen. Fahren wir trotzdem an den See?",
            type: "text",
            correct: "fängt an",
          },
          {
            id: "2b-default-8",
            prompt: "4d. (4) Mist! Ich habe mich so ___, in der Sonne zu liegen und zu faulenzen.",
            type: "text",
            correct: "gefreut",
          },
          {
            id: "2b-default-9",
            prompt: "4d. (5) Nicht vergessen, morgen um 8 ist Training. Ich ___, dich zu sehen.",
            type: "text",
            correct: "hoffe",
          },
          {
            id: "2b-default-10",
            prompt: "4d. (6) Leider kann ich diese Woche nicht. Der Arzt hat mir ___, Sport zu machen.",
            type: "text",
            correct: "verboten",
          },
        ],
      },
      rollen: {
        title: "Mission 2B – Anna oder Paula?",
        shortDescription: "Comprensión del chat: distinguir con claridad qué quiere cada una.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2b-rollen-0",
            prompt: "Wem passt die Aussage? Wählen Sie Anna oder Paula.",
            type: "grid",
            rows: [
              "1. hat vergessen anzurufen.",
              "2. findet Berlin zu stressig.",
              "3. möchte im Urlaub viel Kultur, Ausgehen und Sport.",
              "4. möchte sich am Strand erholen und faulenzen.",
              "5. hat viele interessante Angebote für die Ostsee gefunden.",
              "6. kann heute nicht ins Reisebüro gehen und hat morgen besser Zeit.",
            ],
            columns: ["Anna", "Paula"],
            correct: {
              "1. hat vergessen anzurufen.": "Anna",
              "2. findet Berlin zu stressig.": "Paula",
              "3. möchte im Urlaub viel Kultur, Ausgehen und Sport.": "Anna",
              "4. möchte sich am Strand erholen und faulenzen.": "Paula",
              "5. hat viele interessante Angebote für die Ostsee gefunden.": "Paula",
              "6. kann heute nicht ins Reisebüro gehen und hat morgen besser Zeit.": "Anna",
            },
          },
        ],
      },
      infinitivzu: {
        title: "Mission 2B – Infinitiv mit zu",
        shortDescription: "Foco en las construcciones con infinitivo del chat y del ejercicio.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2b-inf-0",
            prompt: "Ordnen Sie die Satzanfänge den passenden Infinitivgruppen zu.",
            type: "grid",
            rows: [
              "1. Anna und Paula finden es schwer,",
              "2. Für Anna ist es wichtig,",
              "3. Paula hat vor allem vor,",
              "4. Die beiden Freundinnen versuchen,",
              "5. Anna hat erst am nächsten Tag Zeit,"
            ],
            columns: [
              "einen gemeinsamen Urlaub zu planen.",
              "im Urlaub viel zu unternehmen.",
              "sich im Urlaub gut zu erholen.",
              "ein Angebot für beide zu finden.",
              "mit Paula ins Reisebüro zu gehen."
            ],
            correct: {
              "1. Anna und Paula finden es schwer,": "einen gemeinsamen Urlaub zu planen.",
              "2. Für Anna ist es wichtig,": "im Urlaub viel zu unternehmen.",
              "3. Paula hat vor allem vor,": "sich im Urlaub gut zu erholen.",
              "4. Die beiden Freundinnen versuchen,": "ein Angebot für beide zu finden.",
              "5. Anna hat erst am nächsten Tag Zeit,": "mit Paula ins Reisebüro zu gehen."
            }
          },
          {
            id: "2b-inf-1",
            prompt: "Wählen Sie den passenden Ausdruck.",
            type: "grid",
            rows: [
              "1. Ich ___, heute um 7 ins Fitness-Studio zu gehen.",
              "2. Ich ___, auch zu kommen.",
              "3. Es ___, zu regnen.",
              "4. Ich habe mich so ___, in der Sonne zu liegen und zu faulenzen.",
              "5. Ich ___, dich zu sehen.",
              "6. Der Arzt hat mir ___, Sport zu machen."
            ],
            columns: ["habe vor", "versuche", "fängt an", "gefreut", "hoffe", "verboten"],
            correct: {
              "1. Ich ___, heute um 7 ins Fitness-Studio zu gehen.": "habe vor",
              "2. Ich ___, auch zu kommen.": "versuche",
              "3. Es ___, zu regnen.": "fängt an",
              "4. Ich habe mich so ___, in der Sonne zu liegen und zu faulenzen.": "gefreut",
              "5. Ich ___, dich zu sehen.": "hoffe",
              "6. Der Arzt hat mir ___, Sport zu machen.": "verboten"
            }
          }
        ]
      },
    },
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
            prompt: "5a. (1) Nein, mit drei Kindern ist es zu ___, in den Urlaub zu fliegen. Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "teuer",
          },
          {
            id: "2c-default-1",
            prompt: "5a. (2) Für uns ist es völlig ___, an einem Tag über 1.000 km zu fahren. Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "normal",
          },
          {
            id: "2c-default-2",
            prompt: "5a. (3) Es ist einfach ___, am Urlaubsort das Auto zu haben. Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "gut",
          },
          {
            id: "2c-default-3",
            prompt: "5a. (4) Aber ist es nicht ___, so lange Auto zu fahren? Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "gefährlich",
          },
          {
            id: "2c-default-4",
            prompt: "5a. (5) ... deshalb ist es nicht ___, zu übernachten. Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "notwendig",
          },
          {
            id: "2c-default-5",
            prompt: "5a. (6) Es stimmt schon, für die Kinder ist es ___, so lange im Auto zu sitzen. Optionen: gefährlich / gut / langweilig / normal / notwendig / teuer",
            type: "text",
            correct: "langweilig",
          },
          {
            id: "2c-default-6",
            prompt: "5b. 1. Alexandra findet es normal, ___. (sehr früh / aufstehen)",
            type: "text",
            correct: "sehr früh aufzustehen",
          },
          {
            id: "2c-default-7",
            prompt: "5b. 2. Per hat heute keine Lust, ___. (lange / arbeiten)",
            type: "text",
            correct: "lange zu arbeiten",
          },
          {
            id: "2c-default-8",
            prompt: "5b. 3. Janine freut sich, ___. (am Abend / ausgehen)",
            type: "text",
            correct: "am Abend auszugehen",
          },
          {
            id: "2c-default-9",
            prompt: "5b. 4. Ivan darf nicht vergessen, ___. (Obst / einkaufen)",
            type: "text",
            correct: "Obst einzukaufen",
          },
          {
            id: "2c-default-10",
            prompt: "5b. 5. Nino hat vor, ___. (mehr Sport / machen)",
            type: "text",
            correct: "mehr Sport zu machen",
          },
        ],
      },
      adjektive: {
        title: "Mission 2C – Adjektive",
        shortDescription: "Foco en las valoraciones de la familia sobre viajar y conducir.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2c-adj-0",
            prompt: "Wählen Sie das passende Adjektiv.",
            type: "grid",
            rows: [
              "1. Mit drei Kindern ist es zu ___, in den Urlaub zu fliegen.",
              "2. Für uns ist es völlig ___, an einem Tag über 1.000 km zu fahren.",
              "3. Es ist einfach ___, am Urlaubsort das Auto zu haben.",
              "4. Aber ist es nicht ___, so lange Auto zu fahren?",
              "5. Deshalb ist es nicht ___, zu übernachten.",
              "6. Für die Kinder ist es ___, so lange im Auto zu sitzen.",
            ],
            columns: ["teuer", "normal", "gut", "gefährlich", "notwendig", "langweilig"],
            correct: {
              "1. Mit drei Kindern ist es zu ___, in den Urlaub zu fliegen.": "teuer",
              "2. Für uns ist es völlig ___, an einem Tag über 1.000 km zu fahren.": "normal",
              "3. Es ist einfach ___, am Urlaubsort das Auto zu haben.": "gut",
              "4. Aber ist es nicht ___, so lange Auto zu fahren?": "gefährlich",
              "5. Deshalb ist es nicht ___, zu übernachten.": "notwendig",
              "6. Für die Kinder ist es ___, so lange im Auto zu sitzen.": "langweilig",
            },
          },
        ],
      },
      infinitivzu: {
        title: "Mission 2C – Infinitiv mit zu",
        shortDescription: "Foco en la construcción Infinitiv + zu con verbos y expresiones frecuentes.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2c-inf-0",
            prompt: "Schreiben Sie die richtige Form mit Infinitiv + zu: Per hat heute keine Lust, ___. (lange / arbeiten)",
            type: "text",
            correct: "lange zu arbeiten",
          },
          {
            id: "2c-inf-1",
            prompt: "Schreiben Sie die richtige Form mit Infinitiv + zu: Janine freut sich, ___. (am Abend / ausgehen)",
            type: "text",
            correct: "am Abend auszugehen",
          },
          {
            id: "2c-inf-2",
            prompt: "Schreiben Sie die richtige Form mit Infinitiv + zu: Ivan darf nicht vergessen, ___. (Obst / einkaufen)",
            type: "text",
            correct: "Obst einzukaufen",
          },
          {
            id: "2c-inf-3",
            prompt: "Schreiben Sie die richtige Form mit Infinitiv + zu: Nino hat vor, ___. (mehr Sport / machen)",
            type: "text",
            correct: "mehr Sport zu machen",
          },
          {
            id: "2c-inf-4",
            prompt: "Schreiben Sie die richtige Form mit Infinitiv + zu: Alexandra findet es normal, ___. (sehr früh / aufstehen)",
            type: "text",
            correct: "sehr früh aufzustehen",
          },
        ],
      },
      reiseplaene: {
        title: "Mission 2C – Reisepläne",
        shortDescription: "Valoraciones sobre viajar y planes personales con Infinitiv + zu.",
        difficulty: 2,
        bonusMxp: 4,
        blocks: [
          {
            id: "2c-reise-0",
            prompt: "Welche Bewertung passt zur Aussage?",
            type: "grid",
            rows: [
              "1. Mit drei Kindern kostet Fliegen zu viel Geld.",
              "2. An einem Tag über 1.000 km zu fahren, finden sie ganz normal.",
              "3. Am Urlaubsort ein Auto zu haben, finden sie praktisch.",
              "4. Sehr lange Auto zu fahren, kann riskant sein.",
              "5. Für sie ist eine Übernachtung nicht nötig.",
              "6. Für Kinder ist es oft öde, so lange im Auto zu sitzen."
            ],
            columns: ["teuer", "normal", "gut", "gefährlich", "notwendig", "langweilig"],
            correct: {
              "1. Mit drei Kindern kostet Fliegen zu viel Geld.": "teuer",
              "2. An einem Tag über 1.000 km zu fahren, finden sie ganz normal.": "normal",
              "3. Am Urlaubsort ein Auto zu haben, finden sie praktisch.": "gut",
              "4. Sehr lange Auto zu fahren, kann riskant sein.": "gefährlich",
              "5. Für sie ist eine Übernachtung nicht nötig.": "notwendig",
              "6. Für Kinder ist es oft öde, so lange im Auto zu sitzen.": "langweilig"
            }
          },
          {
            id: "2c-reise-1",
            prompt: "Ordnen Sie die Personen den passenden Plänen oder Vorhaben zu.",
            type: "grid",
            rows: ["Alexandra", "Per", "Janine", "Ivan", "Nino"],
            columns: [
              "sehr früh aufzustehen",
              "lange zu arbeiten",
              "am Abend auszugehen",
              "Obst einzukaufen",
              "mehr Sport zu machen"
            ],
            correct: {
              "Alexandra": "sehr früh aufzustehen",
              "Per": "lange zu arbeiten",
              "Janine": "am Abend auszugehen",
              "Ivan": "Obst einzukaufen",
              "Nino": "mehr Sport zu machen"
            }
          }
        ]
      },
    },
  },
} as const;
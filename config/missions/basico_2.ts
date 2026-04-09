// AUTOGENERADO — no editar manualmente
// Regenerar: npx tsx scripts/build-mission-configs.ts

export const MISSIONS_BASICO_2 = {
  "1A": {
    "id": "1A",
    "title": "Misión 1A",
    "blocks": [
      {
        "id": "1a-0",
        "prompt": "1a. Was kommt in den Kühlschrank, was nicht? Ordnen Sie zu.",
        "type": "checkbox_grid",
        "rows": [
          "Apfel",
          "Ei",
          "Banane",
          "Gurke",
          "Tomate",
          "Müsli",
          "Butter",
          "Salz",
          "Brötchen (singular)",
          "Mehl",
          "Essig",
          "Pfeffer",
          "Fleisch"
        ],
        "columns": [
          "kommt in den Kühlschrank",
          "kommt nicht in den Kühlschrank",
          "der",
          "die",
          "das"
        ],
        "correct": {
          "Apfel": [
            "kommt nicht in den Kühlschrank",
            "der"
          ],
          "Ei": [
            "kommt in den Kühlschrank",
            "das"
          ],
          "Banane": [
            "kommt nicht in den Kühlschrank",
            "die"
          ],
          "Gurke": [
            "kommt nicht in den Kühlschrank",
            "die"
          ],
          "Tomate": [
            "kommt nicht in den Kühlschrank",
            "die"
          ],
          "Müsli": [
            "kommt nicht in den Kühlschrank",
            "das"
          ],
          "Butter": [
            "kommt in den Kühlschrank",
            "die"
          ],
          "Salz": [
            "kommt nicht in den Kühlschrank",
            "das"
          ],
          "Brötchen (singular)": [
            "kommt nicht in den Kühlschrank",
            "das"
          ],
          "Mehl": [
            "kommt nicht in den Kühlschrank",
            "das"
          ],
          "Essig": [
            "kommt nicht in den Kühlschrank",
            "der"
          ],
          "Pfeffer": [
            "kommt nicht in den Kühlschrank",
            "der"
          ],
          "Fleisch": [
            "kommt in den Kühlschrank",
            "das"
          ]
        }
      },
      {
        "id": "1a-1",
        "prompt": "2. Wie heißen die Geschäfte? Notieren Sie die Wörter mit Artikel",
        "type": "grid",
        "rows": [
          "IEREGZTEM",
          "TKRAM",
          "IEREKCÄB",
          "TKRAMREPUS"
        ],
        "columns": [
          "der",
          "die",
          "das"
        ],
        "correct": {
          "IEREGZTEM": "die",
          "TKRAM": "der",
          "IEREKCÄB": "die",
          "TKRAMREPUS": "der"
        }
      },
      {
        "id": "1a-2",
        "prompt": "Ordnen Sie: IEREGZTEM",
        "type": "text",
        "correct": ""
      },
      {
        "id": "1a-3",
        "prompt": "Ordnen Sie: TKRAM",
        "type": "text",
        "correct": ""
      },
      {
        "id": "1a-4",
        "prompt": "Ordnen Sie: IEREKCÄB",
        "type": "text",
        "correct": ""
      },
      {
        "id": "1a-5",
        "prompt": "Ordnen Sie: TKRAMREPUS",
        "type": "text",
        "correct": ""
      }
    ]
  },
  "1B": {
    "id": "1B",
    "title": "Misión 1B",
    "blocks": [
      {
        "id": "1b-0",
        "prompt": "3a. Eine Einladung. Hören Sie. Welche Nachricht passt? Notieren Sie.",
        "type": "grid",
        "rows": [
          "A zum Frühstück",
          "B zum Mittagessen",
          "C zu Kaffee und Kuchen",
          "D zum Abendessen"
        ],
        "columns": [
          "Nachricht 1",
          "Nachricht 2",
          "Nachricht 3",
          "Nachricht 4"
        ],
        "correct": {
          "A zum Frühstück": "Nachricht 3",
          "B zum Mittagessen": "Nachricht 4",
          "C zu Kaffee und Kuchen": "Nachricht 1",
          "D zum Abendessen": "Nachricht 2"
        }
      },
      {
        "id": "1b-1",
        "prompt": "3b. Die Grillparty. Ergänzen Sie den Dialog. Ordnen Sie zu.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "columns": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "correct": {
          "1": "E",
          "2": "D",
          "3": "C",
          "4": "A",
          "5": "B"
        }
      }
    ]
  },
  "1C": {
    "id": "1C",
    "title": "Misión 1C",
    "blocks": [
      {
        "id": "1c-0",
        "prompt": "3c. Wie schmeckt das? Ordnen Sie die Lebensmittel zu.",
        "type": "grid",
        "rows": [
          "das Fleisch",
          "die Birne",
          "die Kartoffel",
          "der Käse",
          "der Schinken",
          "der Reis",
          "der/das Keks",
          "die Olive",
          "die Banane",
          "der Fisch",
          "der Kuchen",
          "die Schokolade",
          "die Pommes frites (Pl.)",
          "das Hähnchen",
          "der Zucker",
          "der Salat",
          "das Würstchen",
          "die Suppe"
        ],
        "columns": [
          "süß",
          "nicht süß"
        ],
        "correct": {
          "das Fleisch": "nicht süß",
          "die Birne": "süß",
          "die Kartoffel": "nicht süß",
          "der Käse": "nicht süß",
          "der Schinken": "nicht süß",
          "der Reis": "nicht süß",
          "der/das Keks": "süß",
          "die Olive": "nicht süß",
          "die Banane": "süß",
          "der Fisch": "nicht süß",
          "der Kuchen": "süß",
          "die Schokolade": "süß",
          "die Pommes frites (Pl.)": "nicht süß",
          "das Hähnchen": "nicht süß",
          "der Zucker": "süß",
          "der Salat": "nicht süß",
          "das Würstchen": "nicht süß",
          "die Suppe": "nicht süß"
        }
      }
    ]
  },
  "2A": {
    "id": "2A",
    "title": "Misión 2A",
    "blocks": [
      {
        "id": "2a-0",
        "prompt": "3d. Ergänzen Sie die Nachricht mit den Nomen und dem bestimmten Artikel.",
        "type": "checkbox_grid",
        "rows": [
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        "columns": [
          "den",
          "die",
          "das",
          "Fleisch",
          "Apfelkuchen",
          "Obst",
          "Wasser",
          "Kartoffeln",
          "Würtschen (Plural)"
        ],
        "correct": {
          "2": [
            "das",
            "Fleisch"
          ],
          "3": [
            "den",
            "Apfelkuchen"
          ],
          "4": [
            "das",
            "Obst"
          ],
          "5": [
            "das",
            "Wasser"
          ],
          "6": [
            "die",
            "Kartoffeln"
          ],
          "7": [
            "die",
            "Würtschen (Plural)"
          ]
        }
      }
    ]
  },
  "2B": {
    "id": "2B",
    "title": "Misión 2B",
    "blocks": [
      {
        "id": "2b-0",
        "prompt": "4a. Ergänzen Sie ein und - in der richtigen Form.",
        "type": "grid",
        "rows": [
          "1.1",
          "1.2",
          "1.3",
          "2.1",
          "2.2",
          "3.1",
          "3.2",
          "4.1",
          "4.2",
          "5.1",
          "5.2 (Brötchen Plural)"
        ],
        "columns": [
          "ein",
          "eine",
          "einen",
          "-"
        ],
        "correct": {
          "1.1": "eine",
          "1.2": "eine",
          "1.3": "-",
          "2.1": "ein",
          "2.2": "eine",
          "3.1": "einen",
          "3.2": "ein",
          "4.1": "eine",
          "4.2": "einen",
          "5.1": "eine",
          "5.2 (Brötchen Plural)": "-"
        }
      },
      {
        "id": "2b-1",
        "prompt": "4b. Wählen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        "columns": [
          "die Getränke",
          "einen Kuchen",
          "keinen Salat",
          "einen Fisch",
          "einen Salat",
          "eine Party",
          "die Brötchen",
          "den Fisch"
        ],
        "correct": {
          "1": "eine Party",
          "2": "einen Kuchen",
          "3": "einen Salat",
          "4": "die Getränke",
          "5": "die Brötchen",
          "6": "keinen Salat",
          "7": "einen Kuchen",
          "8": "einen Fisch",
          "9": "den Fisch"
        }
      }
    ]
  },
  "2C": {
    "id": "2C",
    "title": "Misión 2C",
    "blocks": [
      {
        "id": "2c-0",
        "prompt": "1. 100 g Käse (Cent)",
        "type": "text",
        "correct": ""
      },
      {
        "id": "2c-1",
        "prompt": "1. 100 g Schinken (Euro)",
        "type": "text",
        "correct": ""
      },
      {
        "id": "2c-2",
        "prompt": "2. 1 kg Bananen (Euro)",
        "type": "text",
        "correct": ""
      },
      {
        "id": "2c-3",
        "prompt": "2. 5 Äpfel (Euro)",
        "type": "text",
        "correct": ""
      },
      {
        "id": "2c-4",
        "prompt": "3. Kaffee (Euro)",
        "type": "text",
        "correct": ""
      },
      {
        "id": "2c-5",
        "prompt": "3. Kuchen (Euro)",
        "type": "text",
        "correct": ""
      }
    ]
  },
  "3A": {
    "id": "3A",
    "title": "Misión 3A",
    "blocks": [
      {
        "id": "3a-0",
        "prompt": "7. Was passt zusammen?",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        "columns": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "correct": {
          "1": "F",
          "2": "C",
          "3": "E",
          "4": "D",
          "5": "A",
          "6": "B"
        }
      },
      {
        "id": "3a-1",
        "prompt": "8a. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "columns": [
          "möchte",
          "möchtest",
          "möchten",
          "möchtet"
        ],
        "correct": {
          "1": "möchten",
          "2": "möchte",
          "3": "möchte",
          "4": "möchten",
          "5": "möchte",
          "6": "möchten",
          "7": "möchtest",
          "8": "möchten",
          "9": "möchten",
          "10": "möchten"
        }
      }
    ]
  },
  "3B": {
    "id": "3B",
    "title": "Misión 3B",
    "blocks": [
      {
        "id": "3b-0",
        "prompt": "9a. Ergänzen Sie",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        "columns": [
          "mag",
          "magst",
          "mögen",
          "mögt"
        ],
        "correct": {
          "1": "mag",
          "2": "mögen",
          "3": "mag",
          "4": "mögen",
          "5": "mögt",
          "6": "magst",
          "7": "mögen"
        }
      },
      {
        "id": "3b-1",
        "prompt": "9b. 2",
        "type": "text",
        "correct": ""
      },
      {
        "id": "3b-2",
        "prompt": "9b. 3",
        "type": "text",
        "correct": ""
      },
      {
        "id": "3b-3",
        "prompt": "9b. 4",
        "type": "text",
        "correct": ""
      },
      {
        "id": "3b-4",
        "prompt": "9b. 5",
        "type": "text",
        "correct": ""
      }
    ]
  },
  "3C": {
    "id": "3C",
    "title": "Misión 3C",
    "blocks": [
      {
        "id": "3c-0",
        "prompt": "10b. Ordnen Sie.",
        "type": "checkbox_grid",
        "rows": [
          "Butter",
          "Apfel",
          "Sahne",
          "Brötchen",
          "Birne",
          "Käse",
          "Kartoffel",
          "Banane",
          "Salat",
          "Gurke",
          "Milch",
          "Kuchen"
        ],
        "columns": [
          "der",
          "die",
          "das",
          "Obst",
          "Gemüse",
          "Milchprodukte",
          "Backwaren"
        ],
        "correct": {
          "Butter": [
            "die",
            "Milchprodukte"
          ],
          "Apfel": [
            "der",
            "Obst"
          ],
          "Sahne": [
            "die",
            "Milchprodukte"
          ],
          "Brötchen": [
            "das",
            "Backwaren"
          ],
          "Birne": [
            "die",
            "Obst"
          ],
          "Käse": [
            "der",
            "Milchprodukte"
          ],
          "Kartoffel": [
            "die",
            "Gemüse"
          ],
          "Banane": [
            "die",
            "Obst"
          ],
          "Salat": [
            "der",
            "Gemüse"
          ],
          "Gurke": [
            "die",
            "Gemüse"
          ],
          "Milch": [
            "die",
            "Milchprodukte"
          ],
          "Kuchen": [
            "der",
            "Backwaren"
          ]
        }
      },
      {
        "id": "3c-1",
        "prompt": "10c. Was passt nicht?",
        "type": "grid",
        "rows": [
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "columns": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": {
          "2": "4",
          "3": "1",
          "4": "4",
          "5": "4",
          "6": "2",
          "7": "3",
          "8": "1"
        }
      }
    ]
  },
  "4A": {
    "id": "4A",
    "title": "Misión 4A",
    "blocks": [
      {
        "id": "4a-0",
        "prompt": "1. Kreuzen Sie an.",
        "type": "grid",
        "rows": [
          "1a",
          "1b",
          "1c",
          "2a",
          "2b",
          "2c",
          "3a",
          "3b",
          "3c"
        ],
        "columns": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": {
          "1a": "4",
          "1b": "2",
          "1c": "4",
          "2a": "2",
          "2b": "2",
          "2c": "3",
          "3a": "4",
          "3b": "3",
          "3c": "2"
        }
      },
      {
        "id": "4a-1",
        "prompt": "4a.",
        "type": "text",
        "correct": ""
      },
      {
        "id": "4a-2",
        "prompt": "4b.",
        "type": "text",
        "correct": ""
      },
      {
        "id": "4a-3",
        "prompt": "4c.",
        "type": "text",
        "correct": ""
      }
    ]
  },
  "4B": {
    "id": "4B",
    "title": "Misión 4B",
    "blocks": [
      {
        "id": "4b-0",
        "prompt": "11a. Ordnen Sie zu.",
        "type": "grid",
        "rows": [
          "A",
          "B",
          "C",
          "D",
          "F"
        ],
        "columns": [
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        "correct": {
          "A": "3",
          "B": "2",
          "C": "6",
          "D": "5",
          "F": "4"
        }
      }
    ]
  },
  "4C": {
    "id": "4C",
    "title": "Misión 4C",
    "blocks": [
      {
        "id": "4c-0",
        "prompt": "1.1",
        "type": "text",
        "correct": "Zum Frühstück esse ich ein Brötchen mit Butter."
      },
      {
        "id": "4c-1",
        "prompt": "1.2",
        "type": "text",
        "correct": "Ich trinke morgens einen Kaffee."
      },
      {
        "id": "4c-2",
        "prompt": "1.3",
        "type": "text",
        "correct": "Mittags essen wir Reis mit Gemüse."
      },
      {
        "id": "4c-3",
        "prompt": "1.4",
        "type": "text",
        "correct": "Am Abend esse ich einen Salat."
      },
      {
        "id": "4c-4",
        "prompt": "1.5",
        "type": "text",
        "correct": "Wir trinken nachmittags Orangensaft."
      },
      {
        "id": "4c-5",
        "prompt": "1.6",
        "type": "text",
        "correct": "Abends esse ich Brot und Käse."
      },
      {
        "id": "4c-6",
        "prompt": "1.7",
        "type": "text",
        "correct": "Am Wochenende koche ich Nudeln."
      },
      {
        "id": "4c-7",
        "prompt": "1.8",
        "type": "text",
        "correct": "Zum Mittagessen trinke ich Wasser."
      }
    ]
  },
  "6A": {
    "id": "6A",
    "title": "Misión 6A",
    "blocks": [
      {
        "id": "6a-0",
        "prompt": "1a. Der Tag von Lea.",
        "type": "grid",
        "rows": [
          "am Morgen (1)",
          "am Morgen (2)",
          "am Vormittag",
          "am Mittag",
          "am Nachmittag",
          "am Abend"
        ],
        "columns": [
          "reden",
          "lernen",
          "duschen",
          "schlafen gehen",
          "frühstücken",
          "essen"
        ],
        "correct": {
          "am Morgen (1)": "duschen",
          "am Morgen (2)": "frühstücken",
          "am Vormittag": "lernen",
          "am Mittag": "essen",
          "am Nachmittag": "reden",
          "am Abend": "schlafen gehen"
        }
      },
      {
        "id": "6a-1",
        "prompt": "2a. Was passt?",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "columns": [
          "essen",
          "gehen",
          "treffen",
          "lesen",
          "spielen"
        ],
        "correct": {
          "1": "lesen",
          "2": "spielen",
          "3": "treffen",
          "4": "essen",
          "5": "gehen"
        }
      },
      {
        "id": "6a-2",
        "prompt": "2b. Wählen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        "columns": [
          "besucht",
          "trifft",
          "geht",
          "spielt",
          "schläft",
          "isst",
          "lernt"
        ],
        "correct": {
          "1": "isst",
          "2": "spielt",
          "3": "trifft",
          "4": "geht",
          "5": "schläft",
          "6": "lernt",
          "7": "besucht"
        }
      }
    ]
  },
  "6B": {
    "id": "6B",
    "title": "Misión 6B",
    "blocks": [
      {
        "id": "6b-0",
        "prompt": "4a. Ordnen Sie zu.",
        "type": "grid",
        "rows": [
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        "columns": [
          "18:00-22:00",
          "22:00-6:00",
          "9:00-12:00",
          "12:00-14:00",
          "14:00-18:00"
        ],
        "correct": {
          "2": "9:00-12:00",
          "3": "12:00-14:00",
          "4": "14:00-18:00",
          "5": "18:00-22:00",
          "6": "22:00-6:00"
        }
      },
      {
        "id": "6b-1",
        "prompt": "4b. Was passt zusammen?",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        "columns": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "correct": {
          "1": "E",
          "2": "A",
          "3": "F",
          "4": "B",
          "5": "C",
          "6": "D"
        }
      }
    ]
  },
  "6C": {
    "id": "6C",
    "title": "Misión 6C",
    "blocks": [
      {
        "id": "6c-0",
        "prompt": "5a. Kreuzen Sie an.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "columns": [
          "a",
          "b"
        ],
        "correct": {
          "1": "a",
          "2": "b",
          "3": "b",
          "4": "a",
          "5": "a"
        }
      },
      {
        "id": "6c-1",
        "prompt": "6. Notieren Sie.",
        "type": "grid",
        "rows": [
          "Marie besuchen",
          "Tenniskurs",
          "Kino",
          "Pizza essen"
        ],
        "columns": [
          "um vier Uhr",
          "um Viertel nach sechs",
          "um Viertel vor acht",
          "um halb eins"
        ],
        "correct": {
          "Marie besuchen": "um halb eins",
          "Tenniskurs": "um vier Uhr",
          "Kino": "um Viertel vor acht",
          "Pizza essen": "um Viertel nach sechs"
        }
      }
    ]
  },
  "7A": {
    "id": "7A",
    "title": "Misión 7A",
    "blocks": [
      {
        "id": "7a-0",
        "prompt": "7a. Kreuzen Sie an.",
        "type": "grid",
        "rows": [
          "1.1",
          "1.2",
          "2.1a",
          "2.1b",
          "2.2",
          "3",
          "4",
          "5.1",
          "5.2"
        ],
        "columns": [
          "am",
          "um"
        ],
        "correct": {
          "3": "am",
          "4": "um",
          "1.1": "am",
          "1.2": "um",
          "2.1a": "am",
          "2.1b": "um",
          "2.2": "am",
          "5.1": "am",
          "5.2": "um"
        }
      },
      {
        "id": "7a-1",
        "prompt": "7b. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1.1",
          "1.2",
          "2",
          "3.1",
          "3.2",
          "4.1",
          "4.2",
          "5.1",
          "5.2",
          "6.1",
          "6.2",
          "6.3"
        ],
        "columns": [
          "am",
          "um",
          "von",
          "bis"
        ],
        "correct": {
          "2": "am",
          "1.1": "von",
          "1.2": "bis",
          "3.1": "von",
          "3.2": "bis",
          "4.1": "am",
          "4.2": "um",
          "5.1": "am",
          "5.2": "um",
          "6.1": "am",
          "6.2": "von",
          "6.3": "bis"
        }
      }
    ]
  },
  "7B": {
    "id": "7B",
    "title": "Misión 7B",
    "blocks": [
      {
        "id": "7b-0",
        "prompt": "8b. Ordnen Sie zu.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "columns": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "correct": {
          "1": "C",
          "2": "E",
          "3": "B",
          "4": "A",
          "5": "D"
        }
      },
      {
        "id": "7b-1",
        "prompt": "8d. Kreuzen Sie an.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "columns": [
          "mein",
          "meine",
          "meinen"
        ],
        "correct": {
          "1": "meine",
          "2": "meine",
          "3": "meinen",
          "4": "meinen",
          "5": "meine",
          "6": "meine",
          "7": "meine",
          "8": "meine"
        }
      }
    ]
  },
  "7C": {
    "id": "7C",
    "title": "Misión 7C",
    "blocks": [
      {
        "id": "7c-0",
        "prompt": "8e. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "columns": [
          "mein",
          "meine",
          "meinen"
        ],
        "correct": {
          "1": "mein",
          "2": "mein",
          "3": "meine",
          "4": "meine",
          "5": "meine",
          "6": "meine",
          "7": "meine",
          "8": "meinen"
        }
      },
      {
        "id": "7c-1",
        "prompt": "9a. Ordnen Sie.",
        "type": "grid",
        "rows": [
          "Geschwister",
          "arbeiten",
          "fahren",
          "Mutter",
          "Kalender",
          "fragen",
          "frühstücken",
          "Kinder"
        ],
        "columns": [
          "r",
          "a"
        ],
        "correct": {
          "Geschwister": "a",
          "arbeiten": "a",
          "fahren": "r",
          "Mutter": "a",
          "Kalender": "a",
          "fragen": "r",
          "frühstücken": "r",
          "Kinder": "a"
        }
      }
    ]
  },
  "8A": {
    "id": "8A",
    "title": "Misión 8A",
    "blocks": [
      {
        "id": "8a-0",
        "prompt": "9b. Kreuzen Sie an.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6.1",
          "6.2"
        ],
        "columns": [
          "a",
          "b"
        ],
        "correct": {
          "1": "a",
          "2": "a",
          "3": "a",
          "4": "a",
          "5": "b",
          "6.1": "a",
          "6.2": "b"
        }
      },
      {
        "id": "8a-1",
        "prompt": "11a. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4"
        ],
        "columns": [
          "muss",
          "kannst",
          "will",
          "wollen"
        ],
        "correct": {
          "1": "will",
          "2": "kannst",
          "3": "muss",
          "4": "wollen"
        }
      },
      {
        "id": "8a-2",
        "prompt": "11c. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "columns": [
          "muss",
          "musst",
          "müssen",
          "müsst",
          "kann",
          "kannst",
          "können",
          "könnt",
          "will",
          "willst",
          "wollen",
          "wollt"
        ],
        "correct": {
          "1": "muss",
          "2": "will",
          "3": "können",
          "4": "muss",
          "5": "wollen",
          "6": "willst",
          "7": "kann",
          "8": "will"
        }
      }
    ]
  },
  "8B": {
    "id": "8B",
    "title": "Misión 8B",
    "blocks": [
      {
        "id": "8b-0",
        "prompt": "12a. Ergänzen Sie.",
        "type": "grid",
        "rows": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "columns": [
          "Schade",
          "ins Café",
          "Idee",
          "Zeit",
          "leid",
          "geht",
          "morgen",
          "zum Arzt"
        ],
        "correct": {
          "1": "morgen",
          "2": "Zeit",
          "3": "leid",
          "4": "zum Arzt",
          "5": "Schade",
          "6": "geht",
          "7": "ins Café",
          "8": "Idee"
        }
      },
      {
        "id": "8b-1",
        "prompt": "13ab. Notieren Sie.",
        "type": "checkbox_grid",
        "rows": [
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
        "columns": [
          "W",
          "A",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "correct": {
          "A": [
            "8"
          ],
          "B": [
            "A"
          ],
          "C": [
            "W",
            "10"
          ],
          "D": [
            "A",
            "3"
          ],
          "E": [
            "A",
            "5"
          ],
          "F": [
            "W",
            "6"
          ],
          "G": [
            "W",
            "4"
          ],
          "H": [
            "A",
            "9"
          ],
          "I": [
            "A",
            "7"
          ],
          "J": [
            "W",
            "2"
          ]
        }
      }
    ]
  }
} as const;

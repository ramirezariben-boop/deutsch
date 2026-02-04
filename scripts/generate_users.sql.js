// generate_users.sql.js
// Lee un CSV/TSV pegado y genera INSERTs para la tabla User

const fs = require("fs");

// 👇 pega aquí SOLO las filas que quieres insertar (82 en adelante)
const raw = `
82	CABRERA VAZQUEZ ITZEL BERENICE	SAM	berenice	1554
83	CASTELLANOS DOMINGUEZ CARLOS	SAM	carlos	522
84	CASTELLANOS DOMINGUEZ MAXIMILIANO	SAM	maximiliano	915
85	CRUZ BERMEJO THALIA LIZBETH	SAM	lizbeth	1227
87	DAVILA MENDEZ JUAN MANUEL	SAM	manuel	479
88	DE PAZ ROBLES LUIS FELIPE	SAM	felipe	1247
89	GALVAN SALMERON FRANCISCO ALEJANDRO	SAM	alejandro	136
90	GOMEZ FLORES MARIA ISABEL	SAM	isabel	237
91	GONZALEZ RAMIREZ INDRAH	SAM	indrah	855
92	GUZMAN DIAZ JESSICA EVELYN	SAM	evelyn	98
93	HEREDIA VAZQUEZ CRISTA TERESITA	SAM	teresita	1502
94	HERNANDEZ RAMOS DIANA CASANDRA	SAM	casandra	38
95	JIMENEZ HERNANDEZ LESLY CAROLINA	SAM	carolina	307
96	JUAREZ JIMENEZ EVELYN	SAM	evelyn	903
97	LEON MORENO LUIS	SAM	luis	306
98	NUÑEZ CABALLERO JORDAN BRANDON	SAM	brandon	530
99	OCHOA GOMEZ EVELYN DAHELY	SAM	dahely	1243
101	PEREZ HERNANDEZ ANA LUCIA	SAM	lucia	250
102	RAMIREZ GONZALEZ FATIMA CELESTE	SAM	celeste	1049
103	ROBLES CARERA JOSE ADRIAN	SAM	adrian	1611
104	RODRIGUEZ SANTILLAN NADIA	SAM	nadia	1331
105	RODRIGUEZ ZAVALETA VALERY SCARLETH	SAM	scarleth	308
107	SANCHEZ HERNANDEZ LUIS RUBEN	SAM	ruben	818
111	ARROYO CORDOVA HECTOR	SON	hector	824
112	AYALA ROMERO KARLA PAOLA	SON	paola	84
113	BLAS RODRIGUEZ AMANDA ELIZABETH	SON	elizabeth	529
114	CAMARGO RIVAS OSCAR DAVID	SON	david	1064
115	CANCHOLA RAYGOZA MONICA CECILIA	SON	cecilia	212
116	CRUZ CORTES LESLIE JENNIFER	SON	jennifer	1200
119	INCLAN TREJO JULIETA	SON	julieta	1510
120	LOPEZ SANCHEZ ABRAHAM	SON	abraham	228
121	MAGALLANES VALLEJO AURORA GUADALUPE	SON	guadalupe	976
122	MARTINEZ SANCHEZ KERRY	SON	kerry	862
123	MELO ROMO ANETTE CHEYENNE	SON	cheyenne	229
125	PICHARDO REBOLLAR FERNANDA	SON	fernanda	1040
126	PICHARDO REBOLLAR MARLEN	SON	marlen	1041
127	PONCELIS SANTANA IZHAR ABDI	SON	abdi	405
128	RODRIGUEZ HERNANDEZ JANARI	SON	janari	1161
129	TELLEZ VALDES JAVIER ALEXEI	SON	alexei	389
130	TORRES GRANADA XIMENA MARIAN	SON	marian	1068
131	VELAZQUEZ SANCHEZ FERNANDA	SON	fernanda	179
`.trim();

function normalize(str) {
  return str
    .replace(/\u00C3\u0091/g, "Ñ")
    .replace(/\u00C3\u00B1/g, "ñ")
    .replace(/\u00C3\u008D/g, "Í")
    .replace(/\u00C3\u00A9/g, "é")
    .replace(/\u00C3\u00A1/g, "á")
    .replace(/\u00C3\u00B3/g, "ó")
    .replace(/\u00C3\u00BA/g, "ú")
    .replace(/\u00C3\u00AD/g, "í")
    .replace(/\u00C3\u00BC/g, "ü");
}

const lines = raw.split("\n");

const inserts = lines.map(line => {
  const [id, name, , , password] = line.split("\t");

  const numId = Number(id);
  const course =
    numId >= 82 && numId <= 108
      ? "basico_4"
      : numId >= 109
      ? "basico_2"
      : null;

  return `INSERT INTO "User" (id, password, name, current_course)
VALUES (${numId}, '${password}', '${normalize(name)}', '${course}');`;
});

fs.writeFileSync("insert_users.sql", inserts.join("\n\n"));

console.log("✔ Archivo insert_users.sql generado");

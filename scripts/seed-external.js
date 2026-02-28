import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PASSWORD = "202603";

const students = [
  "MARIA DE JESUS GONZALEZ RAMIREZ",
  "BRENDA GUADALUPE NAVA RAMIREZ",
  "CAMILA ITZEL BEAÑA CARPIO",
  "GRACIELA PEREZ RIOS",
  "DAVID AARON UC REYES",
  "BARBARA ABIGAIL GONZALEZ GARCIA",
  "INGRID JEANETTE MILLAN MARTINEZ",
  "ELIZABETH CRUZ RICO",
  "ALEJANDRA LARA GOPAR",
  "YADARI ISABEL HERRERA DOMINGUEZ",
  "TANIA RUBI TENORIO CORTES",
  "GERALDINE ORTIZ ORTIZ",
  "JONATHAN DAVIS HERNANDEZ SANTANA",
  "TENZING OROZCO GARCIA",
  "JOSE JESUS CHAVEZ VARGAS",
  "FERNANDO ALVARADO DOMINGUEZ",
  "JOSE MIGUEL CRUZ HERRERA",
  "TOMAS GUILLEN ALADINO",
  "RANDY ABRAHAM ROSTRO AZPEITIA",
  "MIDIAM GUADALUPE DOROTEO ZACARIAS"
];

async function main() {
  for (let i = 0; i < students.length; i++) {
    const id = `n${i + 1}`;

    await prisma.externalStudent.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: students[i],
        password: PASSWORD
      }
    });

    console.log(`✔ creado ${id}`);
  }

  console.log("Listo.");
}

main().finally(() => prisma.$disconnect());
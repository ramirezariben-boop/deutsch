import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.externalAdmin.upsert({
    where: { id: "admin1" },
    update: {},
    create: {
      id: "admin1",
      name: "Coordinadora",
      password: "panel2026"
    }
  });

  console.log("Admin creado.");
}

main().finally(() => prisma.$disconnect());
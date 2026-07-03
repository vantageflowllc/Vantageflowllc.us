import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@vantageflowllc.us" },
    update: {},
    create: {
      email: "demo@vantageflowllc.us",
      name: "Jordan Ellis",
      passwordHash,
      addresses: {
        create: [
          {
            label: "Home",
            fullName: "Jordan Ellis",
            line1: "482 Kinetic Ave",
            city: "Austin",
            state: "TX",
            zip: "78701",
            country: "United States",
            isDefault: true
          }
        ]
      }
    }
  });

  console.log(`Seeded demo user: ${user.email} / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

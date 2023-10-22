// src/db/seed.ts
import { users } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { db } from ".";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const data: (typeof users.$inferInsert)[] = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      fullName: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      score: +faker.finance.amount(0, 100, 0),
    });
  }

  console.log("Seed start");
  await db.insert(users).values(data);
  console.log("Seed done");
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});

// src/db/seed.ts
import { profiles, users } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { db } from ".";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const userArr: (typeof users.$inferInsert)[] = [];

  for (let index = 1; index <= 20; index++) {
    userArr.push({
      id: index,
      fullName: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      score: +faker.finance.amount(0, 100, 0),
    });
  }

  const profileArr: (typeof profiles.$inferInsert)[] = [];

  for (let index = 1; index <= 20; index++) {
    profileArr.push({
      id: index,
      bio: faker.person.bio(),
      userId: index,
    });
  }

  console.log("Seed start");
  await db.insert(users).values(userArr);
  await db.insert(profiles).values(profileArr);
  console.log("Seed done");
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});

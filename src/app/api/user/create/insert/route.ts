import { db } from "@/db";
import { users } from "@/db/schema";
import { faker } from "@faker-js/faker";

export async function POST() {
  const newUsers = await db
    .insert(users)
    .values({
      fullName: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      score: +faker.finance.amount(0, 100, 0),
    })
    .returning();

  return new Response(JSON.stringify(newUsers));
}

import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";

export async function POST() {
  const newUsers = await db
    .insert(users)
    .values({
      fullName: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      score: +faker.finance.amount(0, 100, 0),
    })
    .returning({
      userId: users.id,
    });

  const userId = newUsers[0].userId;

  for (let index = 1; index <= 5; index++) {
    await db
      .insert(posts)
      .values({
        authorId: userId,
        text: faker.lorem.paragraph(),
      })
      .execute();
  }

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: true,
    },
  });

  return new Response(JSON.stringify(result));
}

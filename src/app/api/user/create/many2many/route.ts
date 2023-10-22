import { db } from "@/db";
import { categories, postOnCategories, posts, users } from "@/db/schema";
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
    .returning({ userId: users.id });

  const userId = newUsers[0].userId;

  const newCats = await db
    .insert(categories)
    .values([
      {
        name: faker.lorem.paragraph(),
      },
      {
        name: faker.lorem.paragraph(),
      },
    ])
    .returning({
      catId: categories.id,
    });

  const newPosts = await db
    .insert(posts)
    .values([
      {
        authorId: userId,
        text: faker.lorem.paragraph(),
      },
      {
        authorId: userId,
        text: faker.lorem.paragraph(),
      },
    ])
    .returning({
      postId: posts.id,
    });

  await db
    .insert(postOnCategories)
    .values([
      {
        postId: newPosts[0].postId,
        categoryId: newCats[0].catId,
      },
      {
        postId: newPosts[1].postId,
        categoryId: newCats[1].catId,
      },
      {
        postId: newPosts[0].postId,
        categoryId: newCats[1].catId,
      },
      {
        postId: newPosts[1].postId,
        categoryId: newCats[0].catId,
      },
    ])
    .execute();

  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      posts: {
        with: {
          postCategories: {
            columns: {},
            with: {
              category: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return new Response(JSON.stringify(result));
}

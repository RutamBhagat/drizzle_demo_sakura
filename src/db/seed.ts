import { categories, postOnCategories, posts, profiles, users } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { db } from ".";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const userArr: (typeof users.$inferInsert)[] = [];

  for (let index = 1; index <= 20; index++) {
    userArr.push({
      fullName: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      score: +faker.finance.amount(0, 100, 0),
    });
  }

  const profileArr: (typeof profiles.$inferInsert)[] = [];

  for (let index = 1; index <= 20; index++) {
    profileArr.push({
      bio: faker.person.bio(),
      userId: index,
    });
  }

  const postsArr: (typeof posts.$inferInsert)[] = [];

  for (let index = 1; index <= 50; index++) {
    postsArr.push({
      text: faker.lorem.paragraph(),
      authorId: +faker.finance.amount(1, 20, 0),
    });
  }

  const categoriesArr: (typeof categories.$inferInsert)[] = [];

  for (let index = 1; index <= 50; index++) {
    categoriesArr.push({
      name: faker.lorem.paragraph(),
    });
  }

  const postOnCategoriesArr: (typeof postOnCategories.$inferInsert)[] = [];

  for (let index1 = 1; index1 <= 50; index1++) {
    for (let index2 = 1; index2 <= 50; index2++) {
      postOnCategoriesArr.push({
        postId: index1,
        categoryId: index2,
      });
    }
  }

  console.log("Seed start");
  await db.insert(users).values(userArr);
  await db.insert(profiles).values(profileArr);
  await db.insert(posts).values(postsArr);
  await db.insert(categories).values(categoriesArr);
  await db.insert(postOnCategories).values(postOnCategoriesArr);
  console.log("Seed done");
  process.exit(0);
};

main().catch((err) => {
  console.log(err);
  process.exit(0);
});

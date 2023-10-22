import { db } from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const user_id = url.searchParams.get("user_id") as string;

  // const result = await db.select().from(users).where(eq(users.id, +user_id));

  // const result = await db.query.users.findMany({
  //   with: {
  //     profile: true,
  //     posts: true,
  //   },
  // });

  // const post = await db.query.posts.findFirst({
  //   with: {
  //     author: true,
  //     postCategories: true,
  //   },
  // });

  const post = await db.query.posts.findFirst({
    with: {
      author: true,
      postCategories: {
        columns: {
          categoryId: false,
          postId: false,
        },
        with: {
          category: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  // const cartegory = await db.query.categories.findFirst({
  //   with: {
  //     posts: true,
  //   },
  // });

  return new Response(JSON.stringify({ post }));
}

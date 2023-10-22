import { db } from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const user_id = url.searchParams.get("user_id") as string;

  // const result = await db.select().from(users).where(eq(users.id, +user_id));

  const result = await db.query.users.findMany({
    with: {
      profile: true,
      posts: true,
    },
  });

  const posts = result.map((user) => user.posts);

  return new Response(JSON.stringify(posts));
}

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const user_id = url.searchParams.get("user_id") as string;

  const result = await db.select().from(users).where(eq(users.id, +user_id));
  return new Response(JSON.stringify(result));
}

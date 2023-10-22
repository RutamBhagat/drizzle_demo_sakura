import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, ne } from "drizzle-orm";

// type Props = {
//   searchParams: {
//     user_id: string;
//   };
// };

export async function GET() {
  const result = await db.select().from(users).where(eq(users.id, +2));
  return new Response(JSON.stringify(result));
}

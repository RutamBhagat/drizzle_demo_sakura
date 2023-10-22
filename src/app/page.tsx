import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const results = await db.select().from(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">{JSON.stringify(results)}</main>
  );
}

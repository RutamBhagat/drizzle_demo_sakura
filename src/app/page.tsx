import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const results = await db.select().from(users);
  const usersArr = await JSON.parse(JSON.stringify(results));

  console.log("usersArr", usersArr);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">{JSON.stringify(usersArr)}</main>
  );
}

export default async function Home() {
  const results = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user?user_id=5`, {
    cache: "no-cache",
  });
  const post = await results.json();

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">{JSON.stringify(post)}</main>;
}

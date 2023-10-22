export default async function Home() {
  const results = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user?user_id=5`, {
    cache: "no-cache",
  });
  const postsArr = await results.json();

  const posts = postsArr?.map((user: any) => user.posts);
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {postsArr?.map((post: any, index: number) => (
        <div key={index}>{JSON.stringify(post)}</div>
      ))}
    </main>
  );
}

import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect('/dashboard');
  } else {
    redirect('/sign-in');
  }
  return (
    <main>
      <h1>Next.js Auth Tutorial</h1>
    </main>
  );
}

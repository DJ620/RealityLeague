import { auth } from "@clerk/nextjs";


export default function Page() {
    const { userId } = auth();
  return (
    <div>Hello, new user</div>
  )
}

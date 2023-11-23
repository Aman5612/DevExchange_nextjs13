import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

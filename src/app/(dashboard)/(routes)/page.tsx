import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
        <UserButton  appearance={{
          elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
        }}/>
    </div>
  );
}

import Question from "@/components/forms/Question";
// import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

// import { auth } from "@clerk/nextjs";

// import { Input } from "@/components/ui/input";
import React from "react";

const AskQuestions = async () => {
  // const { userId } = auth();
  const userId = "clerk123";
  if (!userId) redirect("/sign-in");
  // const mongoUser = await getUserById({ userId });
  console.log("gvcgcfcfcccfccfccfccfc");
  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900 ">Ask a public question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify("ewihwe")} />
      </div>
    </div>
  );
};

export default AskQuestions;

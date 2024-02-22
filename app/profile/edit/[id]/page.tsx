import Question from "@/components/forms/Question";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionById } from "@/lib/actions/question.action";

interface Props {
  itemId: string;
}

const EditQuestions = async ({ params }: Props) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: params.id });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 ">Edit question</h1>
      <div className="mt-9">
        <Question
          questionDetails={JSON.stringify(question)}
          mongoUserId={JSON.stringify(mongoUser._id)}
          type2="edit"
        />
      </div>
    </div>
  );
};

export default EditQuestions;

import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";

const page = async ({ params }) => {
  console.log(params);
  const question = await getQuestionById({ questionId: params._id });
  return (
    <div>
      <h1 className="h1-bold">{question.title}</h1>
    </div>
  );
};

export default page;

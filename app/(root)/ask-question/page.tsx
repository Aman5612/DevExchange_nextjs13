import Question from "@/components/forms/Question";
// import { Input } from "@/components/ui/input";
import React from "react";

const AskQuestions = () => {
  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900 ">Ask a public quesiton</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default AskQuestions;

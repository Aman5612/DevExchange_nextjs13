import { SearchParamsProps } from "@/types";
import QuestionCard from "./cards/QuestionCard";

import { getUserQuestions } from "@/lib/actions/votes.action";

interface Props extends SearchParamsProps {
  searchProps: SearchParamsProps;
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          key={question._id}
          clerkId={userId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upVotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionsTab;

import { SearchParamsProps } from "@/types";
import AnswerCard from "./AnswerCard";
import { getUserAnswer } from "@/lib/actions/user.action";

interface Props extends SearchParamsProps {
  searchProps: SearchParamsProps;
  userId: string;
  clerkId?: string;
}

const AnswersTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserAnswer({ userId });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          _id={answer._id}
          questionId={answer.question._id}
          key={answer._id}
          clerkId={clerkId}
          title={answer.question.title}
          author={answer.author}
          totalAnswers={answer.totalAnswers}
          upVotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;

import Pagination from "../Pagination";
import QuestionCard from "./cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  clerkId?: string;
  page?: number;
}

const QuestionsTab = async ({ userId, clerkId, page }: Props) => {
  const result = await getUserQuestions({ userId, page, pageSize: 5 });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          key={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upVotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <div className=" mt-10">
        <Pagination isNext={result.isNext} pageNumber={page || 1} />
      </div>
    </>
  );
};

export default QuestionsTab;

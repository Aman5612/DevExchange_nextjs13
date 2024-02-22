import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  const mongoQuestions = await getSavedQuestion({ clerkId: userId });

  return (
    <div className="  sticky mx-auto flex w-full flex-col gap-[40px]">
      <h1 className="h1-bold text-dark100_light900 ">Saved Questions</h1>

      <div className=" flex w-full flex-col gap-[20px]">
        {mongoQuestions.length > 0 ? (
          mongoQuestions.map((question: any) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upVotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            heading="There’s no question to show"
            url="/ask-question"
          />
        )}
      </div>
    </div>
  );
}

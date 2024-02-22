import Filter from "@/components/Filter";
import LocalSearchBar from "@/components/LocalSearchBar";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import { HomePageFilters } from "@/constants/HomeFilters";
import { getQuestionsByTag } from "@/lib/actions/tag.action";

export default async function Home({ params }: any) {
  const mongoQuestions = await getQuestionsByTag({ tagId: params._id });

  return (
    <div className="  sticky mx-auto flex w-full flex-col gap-[40px]">
      <div className="flex flex-col gap-[30px] ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>

        <div className="flex min-h-[56px] w-full grow justify-between gap-4 rounded-xl max-sm:flex-col max-sm:items-center">
          <LocalSearchBar
            iconPosition="left"
            route="/"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for Questions..."
            otherClasses="flex-1"
          />
          <Filter filters={HomePageFilters} />
        </div>
      </div>
      <div className=" flex w-full flex-col gap-[20px]">
        {mongoQuestions.questions.length > 0 ? (
          mongoQuestions.questions.map((question: any) => {
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

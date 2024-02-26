import LocalSearchBar from "@/components/LocalSearchBar";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import { QuestionFilters } from "@/constants/HomeFilters";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import CommunityFilter from "@/components/Filters/CommunityFilter";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  const mongoQuestions = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
    pageSize: 10,
  });

  return (
    <div className="  sticky mx-auto flex w-full flex-col gap-[40px]">
      <div className="flex flex-col gap-6">
        <h1 className="h1-bold text-dark100_light900 ">Saved Questions</h1>
        <div className="flex min-h-[56px] w-full grow justify-between gap-4 rounded-xl max-sm:flex-col max-sm:items-center">
          <LocalSearchBar
            iconPosition="left"
            route="/community"
            imgSrc="assets/icons/search.svg"
            placeholder="Search for questions..."
            otherClasses="flex-1"
          />
          <CommunityFilter filters={QuestionFilters} />
        </div>
      </div>

      <div className=" flex w-full flex-col gap-[20px]">
        {mongoQuestions.savedQuestion.length > 0 ? (
          mongoQuestions.savedQuestion.map((question: any) => {
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
      <div className=" mt-10">
        <Pagination
          isNext={mongoQuestions.isNext}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </div>
  );
}

import Filter from "@/components/Filter";
import HomeFilter from "@/components/Home/HomeFilter";
import LocalSearchBar from "@/components/LocalSearchBar";
import NoResult from "@/components/NoResult";
import QuestionCard from "@/components/shared/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomePageFilters } from "@/constants/HomeFilters";
import Questions from "@/constants/Questions";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="  sticky mx-auto flex w-full flex-col gap-[40px]">
      <div className="flex flex-col gap-[30px] ">
        <div className="flex justify-between max-sm:flex-col-reverse">
          <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
          <Link href="/ask-question" className="justify-end max-sm:flex">
            <Button className="primary-gradient min-h-[46px] px-3 py-4">
              <span className="!text-light-900">Ask a Question</span>
            </Button>
          </Link>
        </div>

        <div className="flex min-h-[56px] w-full grow justify-between gap-4 rounded-xl max-sm:flex-col max-sm:items-center">
          <LocalSearchBar
            iconPosition="left"
            route="/"
            imgSrc="assets/icons/search.svg"
            placeholder="Search for Questions..."
            otherClasses="flex-1"
          />
          <Filter filters={HomePageFilters} />
        </div>
        <HomeFilter />
      </div>
      <div className=" flex w-full flex-col gap-[20px]">
        {Questions.length > 0 ? (
          Questions.map((question: Questions) => {
            return (
              <QuestionCard
                _id={question._id}
                key={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upVotes={question.upVotes}
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

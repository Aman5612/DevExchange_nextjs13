import React from "react";
import CommunityFilter from "../Filters/CommunityFilter";
import { AnswerFilters } from "@/constants/HomeFilters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "../Pagination";

interface Props {
  userID: string;
  questionId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AnswerAll = async ({
  userID,
  questionId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    sortBy: filter,
    page,
    pageSize: 10,
  });
  return (
    <div className="mt-11 max-w-3xl">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <span className="my-3 ">
          <CommunityFilter filters={AnswerFilters} />
        </span>
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="text-dark400_light700 flex flex-col sm:flex-row sm:items-center">
                    <p>{answer.author.name}</p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      &nbsp; answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <span>
                  <Votes
                    type="answer"
                    userId={JSON.stringify(userID)}
                    answerId={JSON.stringify(answer._id)}
                    questionId={JSON.stringify(questionId)}
                    hasUpVoted={answer.upvotes.includes(userID)}
                    hadDownVoted={answer.downvotes.includes(userID)}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                  />
                </span>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className=" mt-10">
        <Pagination isNext={result.isNext} pageNumber={page || 1} />
      </div>
    </div>
  );
};

export default AnswerAll;

import React from "react";
import Filter from "../Filter";
import { AnswerFilters } from "@/constants/HomeFilters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  userID: string;
  questionId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AnswerAll = async ({
  userID,
  questionId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.map((answer) => (
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
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p>{answer.author.name}</p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      &nbsp; answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end ">
                  <Votes
                    type="answer"
                    userId={JSON.stringify(userID)}
                    answerId={JSON.stringify(answer._id)}
                    questionId={JSON.stringify(questionId)}
                    hasUpVoted={answer.upvotes.includes(userID)}
                    hadDownVoted={answer.downvotes.includes(userID)}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    // hasSaved={mongoUser.saved.includes(mongoUser._id)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AnswerAll;

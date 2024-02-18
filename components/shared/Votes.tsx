"use client";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import {
  upVoteQuestion,
  downVoteQuestion,
} from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  hasUpVoted: boolean;
  hadDownVoted: boolean;
  upvotes: number;
  downvotes: number;
  userId: string;
  answerId: string;
  questionId: string;
  hasSaved: boolean;
}

const Votes = ({
  type,
  hasUpVoted,
  hadDownVoted,
  upvotes,
  userId,
  answerId,
  questionId,
  downvotes,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleVote = async (action: any) => {
    if (type === "question") {
      if (action === "upvote") {
        await upVoteQuestion({
          hasupVoted: hasUpVoted,
          hasdownVoted: hadDownVoted,
          questionId: JSON.parse(questionId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }
      if (action === "downvote") {
        await downVoteQuestion({
          hasupVoted: hasUpVoted,
          hasdownVoted: hadDownVoted,
          questionId: JSON.parse(questionId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }
      router.push(pathname);
    } else if (type === "answer") {
      if (action === "upvote") {
        await upVoteAnswer({
          hasupVoted: hasUpVoted,
          hasdownVoted: hadDownVoted,
          answerId: JSON.parse(answerId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }
      if (action === "downvote") {
        await downVoteAnswer({
          hasupVoted: hasUpVoted,
          hasdownVoted: hadDownVoted,
          answerId: JSON.parse(answerId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }
      router.push(pathname);
    }
  };

  return (
    <div className="flex gap-3">
      <div className=" flex gap-2">
        <Image
          className="cursor-pointer"
          src={
            hasUpVoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          onClick={() => handleVote("upvote")}
        />
        <div className="background-light700_dark400 flex size-[18px] items-center justify-center rounded-sm">
          <span className="text-dark400_light700 subtle-medium ">
            {upvotes}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Image
          className="cursor-pointer"
          src={
            hadDownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          onClick={() => handleVote("downvote")}
        />
        <div className="background-light700_dark400 flex size-[18px] items-center justify-center rounded-sm">
          <span className="text-dark400_light700 subtle-medium ">
            {downvotes}
          </span>
        </div>
      </div>
      <Image
        className=" ml-4 cursor-pointer"
        src={
          hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="downvote"
      />
    </div>
  );
};

export default Votes;

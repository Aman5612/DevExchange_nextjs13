import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import RenderTags from "../RenderTags";
import { SignedIn, auth } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface Props {
  clerkId?: string;
  _id: number;
  title: string;
  key: number;
  tags: {
    _id: number;
    name: string;
  }[];
  author: {
    _id: number;
    name: string;
    picture: string;
    clerkId: string;
  };
  upVotes: Array<object>;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  key,
  author,
  upVotes,
  views,
  answers,
  createdAt,
}: Props) => {
  const { userId } = auth();
  const authorName = author.name;
  const showEditDeleteAction = userId === author.clerkId && clerkId;

  return (
    <div className="light-border dark:dark-gradient flex flex-col gap-[14px] rounded-[10px] border-[1px] px-[20px] py-[36px] shadow">
      <div className="flex justify-between">
        <Link href={`/question/${_id}`}>
          {" "}
          <h3 className="h3-semibold base-semibold text-dark200_light900 line-clamp-[1] text-[20px]">
            {title}
          </h3>
        </Link>

        <SignedIn>
          {showEditDeleteAction && (
            <EditDeleteAction itemId={JSON.stringify(_id)} type={"question"} />
          )}
        </SignedIn>
      </div>
      <div className="flex gap-[8px] uppercase">
        {tags.map((tag) => {
          return (
            <RenderTags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 max-md:flex-wrap max-sm:flex-wrap max-sm:justify-start ">
        <div className="flex  gap-[5px]">
          <div className="flex gap-[4px] ">
            <Image
              className="rounded-full"
              src={author.picture}
              height={20}
              width={20}
              alt="user"
            />
            <p className="text-dark400_light700 flex items-center font-inter text-[14px] font-medium">
              {authorName}
            </p>
          </div>

          <span className="text-dark400_light700 line-clamp-1  flex items-center text-[12px]">
            • asked {moment(createdAt).fromNow()}
          </span>
        </div>

        <div className="flex gap-[9px]">
          <div className=" flex gap-1">
            <Image
              src="/assets/icons/like.svg"
              alt="vote"
              height={16}
              width={16}
            />
            <p className="text-dark400_light700 flex items-center gap-1 text-[12px]">
              <span>{upVotes.length}</span> Votes
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              src="/assets/icons/message.svg"
              alt="vote"
              height={16}
              width={16}
            />
            <p className="text-dark400_light700 flex items-center gap-1 text-[12px]">
              <span>{answers.length}</span>Answers
            </p>
          </div>
          <div className="flex gap-1 ">
            <Image
              src="/assets/icons/eye.svg"
              alt="vote"
              height={16}
              width={16}
            />
            <p className="text-dark400_light700 flex items-center gap-1 text-[12px]">
              <span>{views}</span>Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

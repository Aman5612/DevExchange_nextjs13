import React from "react";
import RenderTags from "./RenderTags";
import Image from "next/image";

interface Props {
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
    avatar: string;
  };
  upVotes: number;
  views: number;
  answers: number;
  createdAt: string;
}

const QuestionCard = ({
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
  const authorName = author.name;
  return (
    <div className="light-border dark:dark-gradient flex flex-col gap-[14px] rounded-[10px] border-[1px] px-[45px] py-[36px] shadow">
      <h3 className="h3-semibold base-semibold text-dark200_light900 line-clamp-[1] text-[20px]">
        {title}
      </h3>

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

      <div className="flex justify-between">
        <div className="flex gap-[5px]">
          <div className="flex gap-[4px]">
            <Image
              src="assets\icons\au.svg"
              height={20}
              width={20}
              alt="user"
            />
            <p>{authorName}</p>
          </div>

          <p>text</p>
        </div>

        <div className="flex gap-[9px]">
          <div className=" flex">
            <Image
              src="assets/icons/apna.svg"
              alt="vote"
              height={16}
              width={16}
            />
            <p className="text-[12px]">
              <span>1.2k</span>Votes
            </p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

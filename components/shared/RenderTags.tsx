import Link from "next/link";
import React from "react";

interface Props {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTags = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className=" flex justify-between ">
      <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[15px] py-[4px] shadow  ">
        <p className="text-[10px]">{name}</p>
      </div>
      {showCount && (
        <p className="text-dark500_light700 items-center justify-between text-[12px]">
          {totalQuestions}
        </p>
      )}
    </Link>
  );
};

export default RenderTags;

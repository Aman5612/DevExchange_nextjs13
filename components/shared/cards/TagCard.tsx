import React from "react";

import Link from "next/link";

interface Props {
  Tags: {
    name: string;
    _id: string;
    questions: [];
  };
}

const TagCard = ({ Tags }: Props) => {
  const { name, _id, questions } = Tags;
  return (
    <>
      <Link href={`/tags/${_id}`}>
        <div className="shadow-light100_dark100 light-border-2  flex w-[260px] flex-col gap-[20px] rounded-[10px]    border-gray-300 p-[30px]">
          <div className="flex flex-col items-center gap-[20px] ">
            <div className="flex flex-col items-center gap-2">
              <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                <p className="paragraph-semibold text-dark300_light900 ">
                  {name}
                </p>
              </div>
              <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">
                  {questions.length}+
                </span>{" "}
                Questions
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TagCard;

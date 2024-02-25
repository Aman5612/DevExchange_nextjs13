import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  const hotQuestions = await getHotQuestions();

  const toptags = await getTopTags();
  return (
    <section className="light-border custom-scrollbar background-light900_dark200 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l-[1px] p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="flex flex-col  gap-[60px] ">
        <div className="flex flex-col gap-[30px] ">
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          {hotQuestions.map((question) => {
            return (
              <Link
                href={`/question/${question._id}`}
                className="flex items-center justify-between gap-7"
                key={question.title}
              >
                <p className="body-medium  text-dark500_light700">
                  {question.title}
                </p>

                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt="right"
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="h3-bold  text-dark200_light900">Popular Tags</h3>
            {toptags.map((tag) => {
              return (
                <RenderTags
                  _id={tag._id}
                  key={tag._id}
                  name={tag.name}
                  totalQuestions={tag.questions.length}
                  showCount
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;

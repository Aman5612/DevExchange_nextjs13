import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";

interface TopQuestions {
  title: string;
  link: string;
}

const RightSideBar = () => {
  const topQuestions: TopQuestions[] = [
    {
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
      link: "/",
    },
    {
      title: "Is it only me or the font is bolder than necessary?",
      link: "/",
    },
    {
      title: "Can I get the course for free?",
      link: "/",
    },
    {
      title: "Redux Toolkit Not Updating State as Expected",
      link: "/",
    },
    {
      title: "Async/Await Function Not Handling Errors Properly",
      link: "/",
    },
  ];

  const popularTags = [
    {
      _id: 1,
      title: "NEXTJS",
      totalQuestions: 23,
    },
    {
      _id: 2,
      title: "REACt",
      totalQuestions: 13,
    },
    {
      _id: 3,
      title: "JAVASCRIPT",
      totalQuestions: 19,
    },
    {
      _id: 4,
      title: "CSS",
      totalQuestions: 14,
    },
    {
      _id: 5,
      title: "AMAN",
      totalQuestions: 50,
    },
  ];

  return (
    <section className="light-border custom-scrollbar background-light900_dark200 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l-[1px] p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="flex flex-col  gap-[60px] ">
        <div className="flex flex-col gap-[30px] ">
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          {topQuestions.map((question) => {
            return (
              <Link
                href="/"
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
            {popularTags.map((tag) => {
              return (
                <RenderTags
                  _id={tag._id}
                  key={tag._id}
                  name={tag.title}
                  totalQuestions={tag.totalQuestions}
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

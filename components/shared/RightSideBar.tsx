import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSideBar = () => {
  return (
    <section className="light-border custom-scrollbar background-light900_dark200 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l-[1px] p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div className="flex flex-col  gap-[60px] ">
        <div className="flex flex-col gap-[30px] ">
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <Link href="/" className="flex items-center justify-between gap-7">
            <p className="body-medium">
              Best practices for data fetching in a Next.js application with
              Server-Side Rendering (SSR)?
            </p>

            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="right"
              className="invert-colors"
            />
          </Link>
          <Link href="/" className="flex items-center justify-between gap-7">
            <p className="body-medium">
              Is it only me or the font is bolder than necessary?
            </p>

            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="right"
              className="invert-colors"
            />
          </Link>
          <Link href="/" className="flex items-center justify-between gap-7">
            <p className="body-medium">Can I get the course for free?</p>

            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="right"
              className="invert-colors"
            />
          </Link>
          <Link href="/" className="flex items-center justify-between gap-7">
            <p className="body-medium">
              Redux Toolkit Not Updating State as Expected
            </p>

            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="right"
              className="invert-colors"
            />
          </Link>
          <Link href="/" className="flex items-center justify-between gap-7">
            <p className="body-medium">
              Async/Await Function Not Handling Errors Properly
            </p>

            <Image
              src="/assets/icons/chevron-right.svg"
              width={20}
              height={20}
              alt="right"
              className="invert-colors"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="h3-bold ">Popular Tags</h3>
            <Link href="/" className=" flex justify-between">
              <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[16px] py-[8px] ">
                <p className="text-[10px]">NEXTJS</p>
              </div>
              <p className="items-center justify-between text-[12px]">23</p>
            </Link>
            <Link href="/" className=" flex justify-between">
              <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[16px] py-[8px] ">
                <p className="text-[10px]">DEMO</p>
              </div>
              <p className="items-center justify-between text-[12px]">10</p>
            </Link>
            <Link href="/" className=" flex justify-between">
              <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[16px] py-[8px] ">
                <p className="text-[10px]">AMAN</p>
              </div>
              <p className="items-center justify-between text-[12px]">50</p>
            </Link>
            <Link href="/" className=" flex justify-between">
              <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[16px] py-[8px] ">
                <p className="text-[10px]">REACT</p>
              </div>
              <p className="items-center justify-between text-[12px]">32</p>
            </Link>
            <Link href="/" className=" flex justify-between">
              <div className="body-medium text-light400_light500 background-light800_dark300 flex items-center justify-center rounded-[6px] px-[16px] py-[8px] ">
                <p className="text-[10px]">TIWARI</p>
              </div>
              <p className="items-center justify-between text-[12px]">15</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface props {
  heading: string;
  description: string;
  url: string;
}

const NoResult = ({ heading, description, url }: props) => {
  return (
    <div className="mt-10 flex  flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result image"
        height={200}
        width={270}
        className="dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result image"
        height={200}
        width={270}
        className="hidden dark:flex"
      /> 
      <h2 className="h2-bold text-dark200_light900 mt-10 ">{heading}</h2>
      <p className="text-dark500_light700 mx-10 mt-5 text-center text-[14px]">
        {description}
      </p>
      <Link href={url}>
        <Button className="primary-gradient mt-7 text-light-900">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;

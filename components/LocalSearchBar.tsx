"use client";
import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";

interface CustomProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses: string;
  placeholder: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  otherClasses,
  placeholder,
}: CustomProps) => {
  return (
    <div className="background-light800_darkgradient flex min-h-[56px] w-full items-center gap-[16px] rounded-xl px-4">
      <Image
        src={imgSrc}
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus  placeholder background-light800_darkgradient border-none shadow-none outline-none "
      />
    </div>
  );
};

export default LocalSearchBar;

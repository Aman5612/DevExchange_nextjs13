"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlParams, removeFromUrlParams } from "@/lib/utils";

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
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const pathname = usePathname();
  const Router = useRouter();

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (search) {
        const updatedUrl = formUrlParams({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        Router.push(updatedUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const updatedUrl = removeFromUrlParams({
            params: searchParams.toString(),
            keyToRemove: ["q"],
          });
          Router.push(updatedUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(debounceFn);
  }, [search, searchParams, Router, route, pathname]);

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
        value={search}
        className="paragraph-regular no-focus  placeholder background-light800_darkgradient border-none shadow-none outline-none "
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default LocalSearchBar;

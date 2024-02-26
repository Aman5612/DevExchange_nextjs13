"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlParams, removeFromUrlParams } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("global");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (search) {
        const updatedUrl = formUrlParams({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(updatedUrl, { scroll: false });
      } else {
        if (query) {
          const updatedUrl = removeFromUrlParams({
            params: searchParams.toString(),
            keyToRemove: ["global"],
          });
          router.push(updatedUrl, { scroll: false });
        }
        setIsOpen(false);
      }
    }, 300);
    return () => clearTimeout(debounceFn);
  }, [search, router, searchParams, query]);
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center rounded-xl  px-4 ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          className="paragraph-regular no-focus  placeholder background-light800_darkgradient border-none shadow-none outline-none "
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === " " && isOpen) {
              setIsOpen(false);
            }
          }}
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;

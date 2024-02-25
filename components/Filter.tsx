"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlParams } from "@/lib/utils";

interface props {
  filters: {
    name: string;
    value: string;
  }[];
}

const Filter = ({ filters }: props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("filter"); 
  const router = useRouter();
  const handleClick = (item: string) => {
    const updatedUrl = formUrlParams({
      params: searchParams.toString(),
      key: "filter",
      value: item.toLowerCase(),
    });
    router.push(updatedUrl);
  };
  return (
    <div className=" background-light800_dark300 w-auto rounded-xl md:hidden ">
      <Select
      onValueChange={handleClick}
      defaultValue={query||undefined}
      >
        <SelectTrigger className="background-light800_dark300 body-regular light-border text-dark400_light700 min-h-[56px] w-full  border px-5 py-2.5">
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-dark400_light700">
            {filters.map((item) => (
              <SelectItem value={item.value} key={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;

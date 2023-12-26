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
import { HomePageFilters } from "@/constants/HomeFilters";

interface props {
  filters: {
    name: string;
    value: string;
  }[];
}

const Filter = ({ filters }: props) => {
  return (
    <div className=" background-light800_dark300 w-full rounded-xl md:hidden">
      <Select>
        <SelectTrigger className="background-light800_dark300 body-regular light-border text-dark500_light700 min-h-[56px] w-full  border px-5 py-2.5">
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {HomePageFilters.map((item) => (
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

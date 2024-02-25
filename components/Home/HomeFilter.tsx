"use client";
import { HomePageFilters } from "@/constants/HomeFilters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlParams } from "@/lib/utils";

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(" ");

  const handleClick = (value: string) => {
    if (value === active) {
      setActive(" ");
      const updatedUrl = formUrlParams({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(updatedUrl, { scroll: false });
    } else {
      setActive(value);
      const upadatedQuery = formUrlParams({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });
      router.push(upadatedQuery, { scroll: false });
    }
  };
  return (
    <div className="hidden flex-wrap gap-3 md:flex ">
      {HomePageFilters.map((item) => (
        <Button
          className={`body-medium rounded-lg px-6 py-4 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
              : "background-light800_darkgradient text-light-500"
          }`}
          key={item.value}
          onClick={() => {
            handleClick(item.value);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;

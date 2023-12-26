"use client";
import { HomePageFilters } from "@/constants/HomeFilters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilter = () => {
  const active = "newest";
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
          onClick={() => {}}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;

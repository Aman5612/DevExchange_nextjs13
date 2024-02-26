"Use client";
import CommunityFilter from "@/components/Filters/CommunityFilter";
import LocalSearchBar from "@/components/LocalSearchBar";
import Pagination from "@/components/Pagination";
import TagCard from "@/components/shared/cards/TagCard";
import { TagFilters } from "@/constants/HomeFilters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
    pageSize: 10,
  });

  return (
    <section>
      <div className="flex flex-col gap-6">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
        <div className="flex min-h-[56px] w-full grow justify-between gap-4 rounded-xl max-sm:flex-col max-sm:items-center">
          <LocalSearchBar
            iconPosition="left"
            route="/community"
            imgSrc="assets/icons/search.svg"
            placeholder="Search by Tags..."
            otherClasses="flex-1"
          />
          <CommunityFilter filters={TagFilters} />
        </div>
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => {
            return (
              <Link href={`/${tag._id}`} key={tag._id}>
                <TagCard key={tag._id} Tags={tag} />
              </Link>
            );
          })
        ) : (
          <div className="mx-auto mt-12 flex flex-col items-center">
            <h2 className="h2-bold text-dark100_light900">No Users Found</h2>
            <p className="body-regular text-light-500">
              Click here to&nbsp;
              <Link href="/sign-in">Login/</Link>
              <Link href="/sign-up">Signup</Link>
            </p>
          </div>
        )}
      </div>
      <div className=" mt-10">
        <Pagination
          isNext={result.isNext}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </section>
  );
};

export default page;

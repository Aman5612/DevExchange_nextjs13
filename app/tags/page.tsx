"Use client";
import CommunityFilter from "@/components/Filters/CommunityFilter";
import LocalSearchBar from "@/components/LocalSearchBar";
import TagCard from "@/components/shared/cards/TagCard";
import { UserFilters } from "@/constants/HomeFilters";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const result = await getAllTags({});

  return (
    <section>
      <div className="flex flex-col gap-6">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
        <div className="flex min-h-[56px] w-full grow justify-between gap-4 rounded-xl max-sm:flex-col max-sm:items-center">
          <LocalSearchBar
            iconPosition="left"
            route="/community"
            imgSrc="assets/icons/search.svg"
            placeholder="Search by Username..."
            otherClasses="flex-1"
          />
          <CommunityFilter filters={UserFilters} />
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
    </section>
  );
};

export default page;

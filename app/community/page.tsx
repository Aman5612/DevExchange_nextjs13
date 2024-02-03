import CommunityFilter from "@/components/Filters/CommunityFilter";
import LocalSearchBar from "@/components/LocalSearchBar";
import UserCard from "@/components/shared/cards/UserCard";
import { UserFilters } from "@/constants/HomeFilters";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const users = await getAllUsers({});
  return (
    <section>
      <div className="flex flex-col gap-6">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
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
        {users.map((user) => {
          return <UserCard key={user._id} userDetails={user} />;
        })}
      </div>
    </section>
  );
};

export default page;

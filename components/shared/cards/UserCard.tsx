import Image from "next/image";
import React from "react";
import RenderTags from "../RenderTags";
import Link from "next/link";

interface Props {
  userDetails: {
    clerkId: string;
    _id: string;
    name: string;
    username: string;
    picture: string;
  };
}
const tags = ["tag1", "tag2", "tag3"];

const UserCard = ({ userDetails }: Props) => {
  const { name, username, picture } = userDetails;
  return (
    <Link
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
      href={`/profile/${userDetails.clerkId}`}
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          className="  rounded-full"
          src={picture}
          alt="avatar"
          width={100}
          height={100}
        />
      </article>

      <div className="flex flex-col items-center gap-2">
        <h3 className="h3-bold text-dark200_light800 line-clamp-1">{name}</h3>
        <p className="body-regular text-dark500_light500 mt-2 ">@{username}</p>
      </div>

      <div className="mb-6 mt-5 flex justify-center gap-[8px]">
        {tags.map((tag) => {
          return (
            <RenderTags
              key={tag}
              _id={1}
              name={tag}
              totalQuestions={3}
              showCount={false}
            />
          );
        })}
      </div>
    </Link>
  );
};

export default UserCard;

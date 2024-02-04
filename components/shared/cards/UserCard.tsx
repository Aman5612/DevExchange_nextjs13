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

const tags = ["tag1", "tag1", "tag1"];

const UserCard = ({ userDetails }: Props) => {
  const { name, username, picture, clerkId } = userDetails;
  return (
    <>
      <Link href={`/picture/${clerkId}`}>
        <div className="shadow-light100_dark100 light-border-2  flex w-[260px] flex-col gap-[20px] rounded-[10px]  border border-solid border-gray-300 p-[30px]">
          <div className="flex flex-col items-center gap-[20px] ">
            <div className=" overflow-hidden rounded-full">
              <Image
                className="  rounded-full object-cover"
                src={picture}
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="h3-bold text-dark200_light800">{name}</h2>
              <p className="paragraph-regular text-dark500_light500 body-regular ">
                @{username}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-[8px]">
            {tags.map((tag) => {
              return (
                <RenderTags key={tag} _id={1} name={tag} showCount={false} />
              );
            })}
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserCard;

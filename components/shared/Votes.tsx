import Image from "next/image";
import React from "react";

interface Props {
  upvotes: number;
  downvotes: number;
}

const Votes = ({ upvotes, downvotes }: Props) => {
  return (
    <div className="flex gap-3">
      <div className=" flex gap-2">
        <Image
          src="/assets/icons/upvote.svg"
          width={18}
          height={18}
          alt="upvote"
        />
        <div className="background-light700_dark400 flex size-[18px] items-center justify-center rounded-sm">
          <span className="text-dark400_light700 subtle-medium ">12</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Image
          src="/assets/icons/downvote.svg"
          width={18}
          height={18}
          alt="downvote"
        />
        <div className="background-light700_dark400 flex size-[18px] items-center justify-center rounded-sm">
          <span className="text-dark400_light700 subtle-medium ">-2</span>
        </div>
      </div>
    </div>
  );
};

export default Votes;

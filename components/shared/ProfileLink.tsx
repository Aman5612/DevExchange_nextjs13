import Image from "next/image";
import Link from "next/link";
import React from "react";
export interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}
const ProfileLink = ({ imgUrl, href, title }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} width={20} height={20} alt="icon" />
      {href ? (
        <Link href={href} className="paragraph-medium text-blue-500">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;

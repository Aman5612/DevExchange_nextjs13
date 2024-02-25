import AnswerAll from "@/components/shared/AnswerAll";
import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTags from "@/components/shared/RenderTags";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Votes from "@/components/shared/Votes";
import { SearchParamsProps } from "@/types";

const page = async ({ params, searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({
    questionId: params._id || "",
  });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1 "
            href={`/profile/${question.author.clerkId}`}
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              height={22}
              width={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              userId={JSON.stringify(mongoUser._id)}
              questionId={JSON.stringify(question._id)}
              hasUpVoted={question.upvotes.includes(mongoUser._id)}
              hadDownVoted={question.downvotes.includes(mongoUser._id)}
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasSaved={mongoUser.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock-icon"
          value={`asked ${getTimestamp(question.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light700"
        />
      </div>
      <span className="text-dark400_light700 w-auto">
        <ParseHTML data={question.content} />
      </span>
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTags
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AnswerAll
        userID={mongoUser._id}
        questionId={question._id}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter || " "}
      />

      <Answer
        question={question.content}
        authorId={JSON.stringify(mongoUser._id)}
        questionId={JSON.stringify(question._id)}
      />
    </>
  );
};

export default page;

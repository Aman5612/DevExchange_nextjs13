"use server";
import Answer from "@/Database/answer.model";
import { ConnectDataBase } from "../Mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.type";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    ConnectDataBase();
    const { answerId, path } = params;
    await Answer.deleteOne({ _id: answerId });
    await Question.updateOne(
      { answer: answerId },
      { $pull: { answers: answerId } }
    );
    revalidatePath(path);
  } catch (error) {}
};

export async function downVoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    ConnectDataBase();

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $push: { downvotes: userId } };
    }
    await Answer.findOneAndUpdate(
      { _id: new ObjectId(answerId) },
      updateQuery,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function upVoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    ConnectDataBase();

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $push: { upvotes: userId } };
    }
    await Answer.findOneAndUpdate(
      { _id: new ObjectId(answerId) },
      updateQuery,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export const createAnswer = async ({
  author,
  question,
  content,
  path,
}: CreateAnswerParams) => {
  try {
    ConnectDataBase();

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    ConnectDataBase();
    const { questionId, sortBy, page, pageSize } = params;
    let sortQuery = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortQuery = { upvotes: -1 };
        break;
      case "lowestupvotes":
        sortQuery = { upvotes: 1 };
        break;
      case "recent":
        sortQuery = { createdAt: -1 };
        break;
      case "old":
        sortQuery = { createdAt: 1 };
        break;
      default:
        break;
    }

    const size = pageSize || 10;
    const skip = page ? (page - 1) * size : 0;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      })
      .skip(skip)
      .limit(size + 1)
      .sort(sortQuery);

    const isNext = answers.length > size;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

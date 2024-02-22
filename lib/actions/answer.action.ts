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
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });
    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

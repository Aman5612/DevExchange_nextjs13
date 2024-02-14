"use server";
import Answer from "@/Database/answer.model";
import { ConnectDataBase } from "../Mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.type";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";

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

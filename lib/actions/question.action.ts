"use server";

import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";
import { ConnectDataBase } from "../Mongoose";
import Tag from "@/Database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.type";
import User from "@/Database/user.model";

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    ConnectDataBase();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: "Tag", select: "_id name" })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getQuestion(params: GetQuestionsParams) {
  try {
    ConnectDataBase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await ConnectDataBase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

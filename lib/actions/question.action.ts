"use server";

import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";
import { ConnectDataBase } from "../Mongoose";
import Tag from "@/Database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.type";

export async function getQuestion(params: GetQuestionsParams) {
  try {
    await ConnectDataBase();
    const Questions = await Question.find()
      .populate({ path: "author", model: "User" })
      .populate({ path: "tags", model: "Tag" })
      .sort({ createdAt: -1 });
    // console.log(Questions);
    return Questions;
  } catch (error) {
    console.log("Questions fetch nhi ho rahein hain bhai", error);
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

"use server";

import Question from "@/Database/question.model";
import { ConnectDataBase } from "../Mongoose";
import Tag from "@/Database/tag.model";

export async function createQuestion(params: any) {
  try {
    await ConnectDataBase();
    const { title, content, tags, author } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocument = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsetrue: true, new: true }
      );
      tagDocument.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });
  } catch (error) {
    console.log("error", error);
  }
}

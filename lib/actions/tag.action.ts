"use server";
import Tag from "@/Database/tag.model";
import { ConnectDataBase } from "../Mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.type";
import Question from "@/Database/question.model";
import User from "@/Database/user.model";
import { FilterQuery } from "mongoose";

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    await ConnectDataBase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    let sortQuery = {};

    switch (filter) {
      case "popular":
        sortQuery = { questions: -1 };
        break;
      case "recent":
        sortQuery = { createdAt: -1 };
        break;
      case "name":
        sortQuery = { name: 1 };
        break;
      case "old":
        sortQuery = { createdAt: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).sort(sortQuery);
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopTags = async () => {
  try {
    ConnectDataBase();

    const tags = await Tag.aggregate([
      {
        $sort: { questions: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestionsByTag = async (params: GetQuestionsByTagIdParams) => {
  try {
    await ConnectDataBase();
    const { tagId } = params;
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "name  _id",
        },
        {
          path: "author",
          model: User,
          select: "name picture clerkId _id",
        },
      ],
    });
    return { questions: tag?.questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

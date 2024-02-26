"use server";
import Tag from "@/Database/tag.model";
import { ConnectDataBase } from "../Mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams } from "./shared.type";
import Question from "@/Database/question.model";
import User from "@/Database/user.model";
import { FilterQuery } from "mongoose";

interface TagNameParams {
  tagId: string | undefined;
}

export const getTagnameById = async (params: TagNameParams) => {
  try {
    ConnectDataBase();
    const { tagId } = params;
    const tag = await Tag.findById(tagId);
    return tag.name;
  } catch (error) {}
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    await ConnectDataBase();
    const { searchQuery, filter, page, pageSize } = params;

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

    const size = pageSize ? +pageSize : 10;
    const skip = page ? (page - 1) * size : 0;

    const questionCount = await Tag.countDocuments(query);

    const tags = await Tag.find(query).skip(skip).limit(size).sort(sortQuery);

    const isNext = questionCount > (page ? page * size : 0) + tags.length;

    return { tags, isNext };
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
    const { tagId, page, pageSize } = params;

    const size = pageSize || 10;
    const skipValue = page ? (page - 1) * size : 0;

    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      options: {
        skip: skipValue,
        limit: size + 1,
      },
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

    const isNext = tag?.questions.length > size;

    return { questions: tag?.questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

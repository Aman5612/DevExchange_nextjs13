/* eslint-disable no-unused-vars */
"use server";
import { ConnectDataBase } from "../Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.type";
import { revalidatePath } from "next/cache";
import Question from "@/Database/question.model";
import User from "@/Database/user.model";

import { FilterQuery } from "mongoose";
import Tag from "@/Database/tag.model";
import Answer from "@/Database/answer.model";

export const getUserAnswer = async (params: GetUserStatsParams) => {
  const { userId } = params;
  ConnectDataBase();
  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .populate([
        {
          path: "author",
          model: "User",
          select: "name username picture clerkId",
        },
        {
          path: "question",
          model: "Question",
          select: "title _id",
        },
      ])
      .sort({ upvotes: -1 });

    return { totalAnswers, answers: userAnswers };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  const { userId } = params;
  ConnectDataBase();
  try {
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .populate([
        {
          path: "author",
          model: "User",
          select: "name username picture clerkId",
        },
        {
          path: "tags",
          model: "Tag",
          select: "name",
        },
      ])
      .sort({ views: -1, upvotes: -1 });

    return { totalQuestions, questions: userQuestions };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getuserInfo = async (params: GetUserByIdParams) => {
  try {
    ConnectDataBase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {}
};

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    await ConnectDataBase();
    const { clerkId, searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortQuery = {};

    switch (filter) {
      case "most_recent":
        sortQuery = { createdAt: -1 };
        break;
      case "oldest":
        sortQuery = { createdAt: 1 };
        break;
      case "most_voted":
        sortQuery = { upvotes: -1 };
        break;
      case "most_viewed":
        sortQuery = { views: -1 };
        break;
      case "most_answered":
        sortQuery = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { ...sortQuery },
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

    if (!user) {
      throw new Error("User not found");
    }
    const savedQuestion = user.saved;
    return savedQuestion;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function toggleSave(params: ToggleSaveQuestionParams) {
  const { questionId, userId, path } = params;
  try {
    ConnectDataBase();

    const result = await User.findById(userId);
    const isQuestionSaved = result.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await ConnectDataBase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const editUser = async (params: any) => {
  try {
    await ConnectDataBase();
    const { clerkId, name, username, location, bio, portfolio, path } = params;

    const updateQuery = {
      $pull: [
        { name: clerkId },
        { username: clerkId },
        { location: clerkId },
        { bio: clerkId },
        { portfolio: clerkId },
      ],
      $push: { name, username, location, bio, portfolio },
    };

    await User.findOneAndUpdate({ clerkId }, updateQuery, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const updateUser = async (params: UpdateUserParams) => {
  try {
    await ConnectDataBase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const createUser = async (params: CreateUserParams) => {
  try {
    await ConnectDataBase();
    const { clerkId, name, username, email, picture } = params;
    const mongoUser = await User.create({
      clerkId,
      name,
      username,
      email,
      picture,
    });
    return mongoUser;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const getUserById = async (params: GetUserByIdParams) => {
  try {
    await ConnectDataBase();
    const { userId } = params;
    console.log(userId);
    const user = await User.findOne({ clerkId: userId });
    return user || null;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export const getAllUsers = async (params: GetAllUsersParams) => {
  try {
    await ConnectDataBase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let selectQuery = {};

    switch (filter) {
      case "new_users":
        selectQuery = { joinedAt: -1 };
        break;
      case "old_users":
        selectQuery = { joinedAt: 1 };
        break;
      case "top_contributors":
        selectQuery = { reputation: 1 };
        break;
      default:
        break;
    }

    const user = await User.find(query).sort(selectQuery);

    return user || null;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

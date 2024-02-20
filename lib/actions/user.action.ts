"use server";
import { ConnectDataBase } from "../Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.type";
import { revalidatePath } from "next/cache";
import Question from "@/Database/question.model";
import User from "@/Database/user.model";

import { FilterQuery } from "mongoose";
import Tag from "@/Database/tag.model";
import Answer from "@/Database/answer.model";

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
    const { clerkId, page, pageSize, searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
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

    const user = await User.find().sort({ createdAt: -1 });

    return user || null;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

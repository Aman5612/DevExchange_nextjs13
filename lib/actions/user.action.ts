import User from "@/Database/user.model";
import { ConnectDataBase } from "../Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.type";
import { revalidatePath } from "next/cache";
import Question from "@/Database/question.model";

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

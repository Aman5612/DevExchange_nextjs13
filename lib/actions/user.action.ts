import User from "@/Database/user.model";
import { ConnectDataBase } from "../Mongoose";

export const getUserById = async (params: any) => {
  try {
    await ConnectDataBase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

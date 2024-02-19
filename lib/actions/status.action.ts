"user server";
import User from "@/Database/user.model";
import { ConnectDataBase } from "../Mongoose";
import { redirect } from "next/navigation";

export const userStatus = async (params: any) => {
  try {
    await ConnectDataBase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      return true;
    } else {
      redirect("/signup");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

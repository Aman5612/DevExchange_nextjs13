import Tag from "@/Database/tag.model";
import { ConnectDataBase } from "../Mongoose";
import { GetAllTagsParams } from "./shared.type";

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    await ConnectDataBase();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

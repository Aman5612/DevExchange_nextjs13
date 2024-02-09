import { ConnectDataBase } from "../Mongoose";
import { CreateAnswerParams } from "./shared.type";

export const createAnswer = async ({ author, question, content, path  }: CreateAnswerParams) => {
  try {
    ConnectDataBase();
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

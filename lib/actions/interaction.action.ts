"use server";

import Question from "@/Database/question.model";
import { ConnectDataBase } from "../Mongoose";
import { ViewQuestionParams } from "./shared.type";
import Interaction from "@/Database/interaction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  const { questionId, userId } = params;
  try {
    await ConnectDataBase();
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const exisitingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (exisitingInteraction) {
        return console.log("User Already Viewed this question");
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

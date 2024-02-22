"use server";

import Question from "@/Database/question.model";
import { ConnectDataBase } from "../Mongoose";
import { GetUserStatsParams, QuestionVoteParams } from "./shared.type";

// export const getQuestionVotes = async (params: QuestionVoteParams) => {
//   try {
//     ConnectDataBase();
//     const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

//     const votes = await Question.
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };


export const addQuestionVote = async (params: QuestionVoteParams) => {
  try {
    ConnectDataBase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    const votes = await Question.findByOneAndUpdate(questionId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

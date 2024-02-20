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

export const getUserQuestions = async (params: GetUserStatsParams) => {
  const { userId, page = 1, pageSize = 10 } = params;
  ConnectDataBase();
  try {
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .populate([
        { path: "author", model: "User", select: "name username picture" },
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

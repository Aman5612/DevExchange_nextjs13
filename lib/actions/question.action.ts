"use server";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";
import { ConnectDataBase } from "../Mongoose";
import Tag from "@/Database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.type";
import User from "@/Database/user.model";
import { ObjectId } from "mongodb";
import Answer from "@/Database/answer.model";
import Interaction from "@/Database/interaction.model";
import { FilterQuery } from "mongoose";

export const getHotQuestions = async () => {
  ConnectDataBase();
  try {
    const hotQuestions = await Question.aggregate([
      {
        $sort: { views: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    return hotQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    ConnectDataBase();
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    await Interaction.deleteMany({ question: questionId });
    revalidatePath(path);
  } catch (error) {}
};

export async function upVoteQuestion(params: QuestionVoteParams) {
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    ConnectDataBase();

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $push: { upvotes: userId } };
    }

    await Question.findOneAndUpdate(
      { _id: new ObjectId(questionId) },
      updateQuery,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function downVoteQuestion(params: QuestionVoteParams) {
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    ConnectDataBase();

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $push: { downvotes: userId } };
    }
    await Question.findOneAndUpdate(
      { _id: new ObjectId(questionId) },
      updateQuery,
      { new: true }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    ConnectDataBase();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: "Tag", select: "_id name" })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getQuestion(params: GetQuestionsParams) {
  try {
    ConnectDataBase();

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
   
    let selectQuery ={};

    switch(filter){
      case "frequent":
        selectQuery = {views: -1}
        break;
      case "newest":
        selectQuery = {createdAt: -1}
        break;
      case "unanswered":
        query.answers = { $size: 0 }
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(selectQuery);

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await ConnectDataBase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function editQuestion(params: EditQuestionParams) {
  try {
    await ConnectDataBase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

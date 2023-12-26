"use server";

import { ConnectDataBase } from "../Mongoose";

export async function createQuestion(params: any) {
  try {
    ConnectDataBase();
  } catch (error) {}
}

import mongoose from "mongoose";

let isConnected: boolean = false;

export const ConnectDataBase = async () => {
  mongoose.set("strict", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL is missing");
  }
  if (isConnected) {
    return console.log("Mongogb is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Devexchange",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("error", error);
  }
};

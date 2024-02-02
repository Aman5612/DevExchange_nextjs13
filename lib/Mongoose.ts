import mongoose from "mongoose";

let isConnected: boolean = false;

export const ConnectDataBase = async () => {
  mongoose.set("strict", true);

  const URL =
    "mongodb+srv://aman5612:hUw42fXicveWNNc6@cluster0.cqhprto.mongodb.net/?retryWrites=true&w=majority";
  if (!URL) {
    return console.log("MONGODB_URL is missing");
  }
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }
  try {
    await mongoose.connect(URL, {
      dbName: "devexchange",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

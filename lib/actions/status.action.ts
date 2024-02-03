import { ConnectDataBase } from "../Mongoose";

export const userStatus = async () => {
  try {
    await ConnectDataBase();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: String;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
    y,
  },
  saved: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;

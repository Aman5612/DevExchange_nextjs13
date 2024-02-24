import * as z from "zod";

export const Questions = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const Answers = z.object({
  answer: z.string().min(50),
});

export const Profile = z.object({
  name: z.string().max(50),
  username: z.string().min(2).max(15),
  portfolio: z.string().min(0).max(30),
  location: z.string().min(0).max(50),
  bio: z.string().min(2).max(150),
});

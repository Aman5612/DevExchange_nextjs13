import * as z from "zod";

export const Questions = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

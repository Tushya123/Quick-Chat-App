import { z } from "zod";
export const createChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Chat Title must be 4 characters long" })
      .max(191, { message: "Chat title must be less than 191 characters " }),
    passcode: z
      .string()
      .min(4, { message: "Chat Passcode must be 4 characters long" })
      .max(25, { message: "Passcode must be less than 25" }),
  })
  .required();

  export type createChatSchemaType = z.infer<typeof createChatSchema>

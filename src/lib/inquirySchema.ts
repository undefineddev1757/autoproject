import { z } from "zod";

// Client payload schema (insert inquiry)
export const insertInquirySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string(),
  message: z.string().optional(),
});

// Full object schema returned by server (id & createdAt added)
export const fullInquirySchema = insertInquirySchema.extend({
  id: z.number(),
  createdAt: z.date(),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = z.infer<typeof fullInquirySchema>; 
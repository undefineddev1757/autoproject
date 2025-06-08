import type { Express, Request, Response } from "express";
import { createServer, Server } from "http";
import { insertInquirySchema, Inquiry } from "@/lib/inquirySchema";
import { sendInquiryNotification } from "./telegram";
import { z, ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry: Inquiry = { ...data, id: Date.now(), createdAt: new Date() };
      await sendInquiryNotification(inquiry);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.message });
      }
      console.error("Error creating inquiry", err);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  return createServer(app);
} 
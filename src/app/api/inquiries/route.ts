import { type NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import { insertInquirySchema, type Inquiry } from "@/lib/inquirySchema";
import { z } from "zod";

// Reuse one bot instance per environment
let bot: TelegramBot | null = null;
const getBot = () => {
  if (bot) return bot;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  bot = new TelegramBot(token, { polling: false });
  return bot;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inquiryData = insertInquirySchema.parse(body);

    const inquiry: Inquiry = {
      ...inquiryData,
      id: Date.now(),
      createdAt: new Date(),
    };

    // Send Telegram notification if credentials present
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const tgBot = getBot();
    if (tgBot && chatId) {
      const message = formatInquiryMessage(inquiry);
      await tgBot.sendMessage(chatId, message, { parse_mode: "HTML" });
    }

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("Failed to create inquiry", error);
    return NextResponse.json({ message: "Failed to create inquiry" }, { status: 500 });
  }
}

function formatInquiryMessage(inquiry: Inquiry) {
  const { name, email, phone, message, createdAt } = inquiry;
  let formatted = "<b>🚗 Новая заявка с сайта!</b>\n\n";
  if (name) {
    formatted += `<b>Имя:</b> ${name}\n`;
  }
  if (email) {
    formatted += `<b>Email:</b> ${email}\n`;
  }
  formatted += `<b>Телефон:</b> ${phone}\n`;
  if (message) {
    formatted += "\n<b>Параметры поиска:</b>\n";
    const stripped = message.replace(
      /Интересует автомобиль со следующими параметрами:\n/,
      "",
    );
    formatted += stripped;
  }
  formatted += `\n<i>Дата: ${new Date(createdAt).toLocaleString("ru-RU")}</i>`;
  return formatted;
}

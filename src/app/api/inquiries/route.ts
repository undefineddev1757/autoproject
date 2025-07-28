import { type NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import { insertInquirySchema, type Inquiry } from "@/lib/inquirySchema";
import { z } from "zod";
import { getTableForMessage, insertInquiry, isDuplicate, setInquiryTakenBy } from "@/lib/db";

// Reuse one bot instance per environment
let bot: TelegramBot | null = null;
const getBot = () => {
  if (bot) return bot;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  bot = new TelegramBot(token, { polling: true });
  bot.on("callback_query", handleCallbackQuery);
  return bot;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inquiryData = insertInquirySchema.parse(body);

    if (await isDuplicate(inquiryData.email, inquiryData.phone)) {
      return NextResponse.json({ message: "duplicate" }, { status: 409 });
    }

    const table = getTableForMessage(inquiryData.message);
    const insertResult = await insertInquiry(table, inquiryData);

    const inquiry: Inquiry = {
      ...inquiryData,
      id: insertResult.id,
      createdAt: insertResult.createdAt,
    };

    // Send Telegram notification if credentials present
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const tgBot = getBot();
    if (tgBot && chatId) {
      const message = formatInquiryMessage(inquiry);
      try {
        await tgBot.sendMessage(chatId, message, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Take", callback_data: `take_${inquiry.id}` }],
            ],
          },
        });
      } catch (err) {
        console.error("Telegram send error", err);
        // Continue without failing the request
      }
    }

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("Failed to create inquiry", error);
    return NextResponse.json(
      { message: "Failed to create inquiry" },
      { status: 500 },
    );
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

async function handleCallbackQuery(query: TelegramBot.CallbackQuery) {
  if (!bot || !query.message || !query.data) return;
  if (!query.data.startsWith("take_")) return;
  const id = Number(query.data.replace("take_", ""));
  const username = query.from.username || query.from.first_name;
  const success = await setInquiryTakenBy(id, `@${username}`);

  const original = (query.message.text || "").replace(/\nВзял.*$/, "");
  const newText = success ? `${original}\nВзял @${username}` : `${original}\nУже взято`;

  try {
    await bot.editMessageText(newText, {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      parse_mode: "HTML",
    });
    await bot.answerCallbackQuery(query.id, { text: success ? "Заявка ваша" : "Уже взято" });
  } catch (err) {
    console.error("Failed to handle take", err);
  }
}

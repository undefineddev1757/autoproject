import TelegramBot from "node-telegram-bot-api";
import { Inquiry } from "@/lib/inquirySchema";
import { setInquiryTakenBy } from "../src/lib/db";

let bot: TelegramBot | null = null;
let chatId: string | null = null;

export function initTelegramBot(token: string, groupChatId: string) {
  if (!token) {
    console.warn("Telegram bot token not provided, notifications disabled");
    return;
  }
  try {
    bot = new TelegramBot(token, { polling: true });
    chatId = groupChatId;
    console.log("Telegram bot initialized");
    bot.on("callback_query", handleCallbackQuery);
  } catch (err) {
    console.error("Failed to init Telegram bot", err);
    bot = null;
  }
}

export async function sendInquiryNotification(inquiry: Inquiry) {
  if (!bot || !chatId) {
    console.warn("Telegram bot not initialized, skip send");
    return;
  }
  try {
    const message = formatInquiryMessage(inquiry);
    await bot.sendMessage(chatId, message, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Take", callback_data: `take_${inquiry.id}` }],
        ],
      },
    });
  } catch (err) {
    console.error("Telegram notification failed", err);
  }
}

function formatInquiryMessage(inquiry: Inquiry) {
  const { name, email, phone, message, createdAt } = inquiry;
  let formatted = `<b>🚗 Новая заявка с сайта!</b>\n\n`;
  if (name) {
    formatted += `<b>Имя:</b> ${name}\n`;
  }
  if (email) {
    formatted += `<b>Email:</b> ${email}\n`;
  }
  formatted += `<b>Телефон:</b> ${phone}\n`;
  if (message) {
    formatted += `\n<b>Параметры поиска:</b>\n`;
    const stripped = message.replace(/Интересует автомобиль со следующими параметрами:\n/, "");
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
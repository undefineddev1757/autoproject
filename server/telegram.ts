import TelegramBot from "node-telegram-bot-api";
import { Inquiry } from "@/lib/inquirySchema";

let bot: TelegramBot | null = null;
let chatId: string | null = null;

export function initTelegramBot(token: string, groupChatId: string) {
  if (!token) {
    console.warn("Telegram bot token not provided, notifications disabled");
    return;
  }
  try {
    bot = new TelegramBot(token, { polling: false });
    chatId = groupChatId;
    console.log("Telegram bot initialized");
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
    await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
  } catch (err) {
    console.error("Telegram notification failed", err);
  }
}

function formatInquiryMessage(inquiry: Inquiry) {
  const { email, phone, message, createdAt } = inquiry;
  let formatted = `<b>🚗 Новая заявка с сайта!</b>\n\n`;
  formatted += `<b>Email:</b> ${email}\n`;
  formatted += `<b>Телефон:</b> ${phone}\n`;
  if (message) {
    formatted += `\n<b>Параметры поиска:</b>\n`;
    const stripped = message.replace(/Интересует автомобиль со следующими параметрами:\n/, "");
    formatted += stripped;
  }
  formatted += `\n<i>Дата: ${new Date(createdAt).toLocaleString("ru-RU")}</i>`;
  return formatted;
} 
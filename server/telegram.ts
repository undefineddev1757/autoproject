import TelegramBot from "node-telegram-bot-api";
import { Inquiry } from "@/lib/inquirySchema";
import { setInquiryTakenBy } from "../src/lib/db";
import path from "node:path";
import fs from "node:fs";

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
    bot.on("message", handleMessageCommand);
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
  const { success, owner } = await setInquiryTakenBy(id, `@${username}`);

  const original = (query.message.text || "").replace(/\nВзял.*$/, "");
  const takenUser = owner || `@${username}`;
  const newText = `${original}\nВзял ${takenUser}`;

  try {
    await bot.editMessageText(newText, {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      parse_mode: "HTML",
    });
    await bot.answerCallbackQuery(query.id, { text: success ? "Заявка ваша" : `Заявку уже взял ${takenUser}` });
  } catch (err) {
    console.error("Failed to handle take", err);
  }
}

// Handle text commands like /db
function handleMessageCommand(msg: TelegramBot.Message) {
  if (!bot) return;
  if (!msg.text) return;

  const text = msg.text.trim();
  // Only react to "/db" or "/dump" commands
  if (text === "/db" || text === "/dump") {
    const filePath = path.join(process.cwd(), "data", "database.json");
    if (fs.existsSync(filePath)) {
      bot.sendDocument(msg.chat.id, filePath, {
        caption: "📄 Текущая база данных (database.json)",
      }).catch((err) => console.error("Failed to send DB", err));
    } else {
      bot.sendMessage(msg.chat.id, "Файл базы данных не найден").catch(console.error);
    }
  }
}
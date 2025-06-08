import express from "express";
import { registerRoutes } from "./routes";
import { initTelegramBot } from "./telegram";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init telegram
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
if (token && chatId) {
  initTelegramBot(token, chatId);
}

const server = registerRoutes(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 
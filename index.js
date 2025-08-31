import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start command
bot.start((ctx) => {
  ctx.reply(`👋 Hello ${ctx.from.first_name}! 
Welcome to your SMM Panel Bot 🚀

➡️ Use /help to see commands.`);
});

// /help command
bot.command("help", (ctx) => {
  ctx.reply(`
📋 Available Commands:
/start - Start the bot
/help - Show this help menu
/wallet - Check your wallet balance (coming soon)
/order - Place an order (coming soon)
  `);
});

// Simple test command
bot.command("ping", (ctx) => {
  ctx.reply("🏓 Pong! Bot is running.");
});

// Launch bot
bot.launch()
  .then(() => console.log("🤖 Bot is running..."))
  .catch(err => console.error("Bot launch error:", err));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start → স্থায়ী নিচের মেনু
bot.start((ctx) => {
  ctx.reply(
    `👋 Welcome to SMM Panel Bot
    
📌 Facebook • Instagram • TikTok • YouTube • Telegram সার্ভিস  
⚡ Fast delivery  🛒 Easy order  

👇 নিচের মেনু থেকে বেছে নিন`,
    Markup.keyboard([
      ["📦 Service List", "💳 Wallet"],
      ["📞 Support"]
    ])
      .resize() // ফিট হবে মোবাইলে
      .oneTime(false) // সবসময় থাকবে
  );
});

// Service List → Reply Keyboard update
bot.hears("📦 Service List", (ctx) => {
  ctx.reply(
    "📦 প্ল্যাটফর্ম নির্বাচন করুন 👇",
    Markup.keyboard([
      ["📸 Instagram", "📘 Facebook"],
      ["🎵 TikTok", "▶️ YouTube"],
      ["⬅️ Back"]
    ]).resize()
  );
});

// Instagram Sub Menu
bot.hears("📸 Instagram", (ctx) => {
  ctx.reply(
    "📌 Instagram — কোন ধরনের সার্ভিস?",
    Markup.keyboard([
      ["👀 View", "👥 Followers"],
      ["👍 Reaction", "🔄 Share"],
      ["⬅️ Back"]
    ]).resize()
  );
});

// Example Service Actions
bot.hears("👀 View", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.hears("👥 Followers", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.hears("👍 Reaction", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.hears("🔄 Share", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));

// Wallet
bot.hears("💳 Wallet", (ctx) => ctx.reply("💳 আপনার ব্যালেন্স: 0 INR (ডেমো)"));

// Support
bot.hears("📞 Support", (ctx) => ctx.reply("📞 সাহায্যের জন্য যোগাযোগ করুন: @YourUsername"));

// Back button
bot.hears("⬅️ Back", (ctx) => {
  ctx.reply(
    "👋 Welcome back!\n👇 মেনু থেকে বেছে নিন",
    Markup.keyboard([
      ["📦 Service List", "💳 Wallet"],
      ["📞 Support"]
    ]).resize()
  );
});

bot.launch().then(() => console.log("🤖 SMM Panel Bot Running..."));

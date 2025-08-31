import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start → Main Menu
bot.start((ctx) => {
  ctx.reply(
    `👋 Welcome to SMM Panel Bot

📌 Facebook • Instagram • TikTok • YouTube • Telegram সার্ভিস
⚡ Fast delivery  🛒 Easy order

👇 নিচের মেনু থেকে বেছে নিন`,
    Markup.inlineKeyboard([
      [Markup.button.callback("📦 Service List", "SERVICES")],
      [Markup.button.callback("💳 Wallet", "WALLET")],
      [Markup.button.callback("📞 Support", "SUPPORT")],
    ])
  );
});

// Service List Menu
bot.action("SERVICES", (ctx) => {
  ctx.editMessageText(
    "📦 প্ল্যাটফর্ম নির্বাচন করুন 👇",
    Markup.inlineKeyboard([
      [Markup.button.callback("📸 Instagram", "INSTAGRAM")],
      [Markup.button.callback("📘 Facebook", "FACEBOOK")],
      [Markup.button.callback("🎵 TikTok", "TIKTOK")],
      [Markup.button.callback("▶️ YouTube", "YOUTUBE")],
      [Markup.button.callback("⬅️ Back", "BACK_MAIN")],
    ])
  );
});

// Instagram Sub Menu
bot.action("INSTAGRAM", (ctx) => {
  ctx.editMessageText(
    "📌 Instagram — কোন ধরনের সার্ভিস?",
    Markup.inlineKeyboard([
      [
        Markup.button.callback("👀 View", "IG_VIEW"),
        Markup.button.callback("👥 Followers", "IG_FOLLOWERS")
      ],
      [
        Markup.button.callback("👍 Reaction", "IG_REACTION"),
        Markup.button.callback("🔄 Share", "IG_SHARE")
      ],
      [Markup.button.callback("⬅️ Back", "SERVICES")]
    ])
  );
});

// Instagram Service Types
bot.action("IG_VIEW", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.action("IG_FOLLOWERS", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.action("IG_REACTION", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));
bot.action("IG_SHARE", (ctx) => ctx.reply("❌ এই সাবটাইপের জন্য কোনো অফার সেট করা নেই।"));

// Wallet & Support
bot.action("WALLET", (ctx) => ctx.reply("💳 আপনার ব্যালেন্স: 0 INR (ডেমো)"));
bot.action("SUPPORT", (ctx) => ctx.reply("📞 সাহায্যের জন্য যোগাযোগ করুন: @YourUsername"));

// Back to Main Menu
bot.action("BACK_MAIN", (ctx) => {
  ctx.editMessageText(
    "👋 Welcome back!\n👇 মেনু থেকে বেছে নিন",
    Markup.inlineKeyboard([
      [Markup.button.callback("📦 Service List", "SERVICES")],
      [Markup.button.callback("💳 Wallet", "WALLET")],
      [Markup.button.callback("📞 Support", "SUPPORT")],
    ])
  );
});

// Run bot
bot.launch().then(() => console.log("🤖 SMM Panel Bot Running..."));

import sqlite3
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

# ========== BOT TOKENS ==========
MAIN_BOT_TOKEN = "8192834277:AAFjwCvhs9GRZ8tB-AQTILoXwSIIbLTQ3JI"   # User Panel Bot
INFO_BOT_TOKEN = "8476192288:AAFYbRrlDZMnmA45sG7x50oUbJoZTpRnIyY"   # Info/Log Bot
ADMIN_CHAT_ID = 7616539095           # যেখানে নোটিফিকেশন যাবে (তোমার Telegram ID)

# ========== BOT INIT ==========
main_bot = Bot(token=MAIN_BOT_TOKEN)
info_bot = Bot(token=INFO_BOT_TOKEN)
dp = Dispatcher(main_bot)

# ========== DATABASE ==========
conn = sqlite3.connect("smm.db")
cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT,
    balance REAL DEFAULT 0
)""")

cur.execute("""CREATE TABLE IF NOT EXISTS orders(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service TEXT,
    link TEXT,
    quantity INTEGER,
    status TEXT DEFAULT 'Pending'
)""")
conn.commit()

# ========== COMMANDS ==========

@dp.message_handler(commands=["start"])
async def start_cmd(msg: types.Message):
    user_id = msg.from_user.id
    username = msg.from_user.username

    cur.execute("SELECT * FROM users WHERE id=?", (user_id,))
    if not cur.fetchone():
        cur.execute("INSERT INTO users(id, username) VALUES (?, ?)", (user_id, username))
        conn.commit()

        # Info Bot এ নতুন ইউজার নোটিফিকেশন যাবে
        await info_bot.send_message(
            ADMIN_CHAT_ID, f"👤 New User Joined!\nID: {user_id}\nUsername: @{username}"
        )

    await msg.answer("✅ Welcome to SMM Panel!\nUse /menu to continue.")

@dp.message_handler(commands=["menu"])
async def menu_cmd(msg: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    keyboard.add("➕ Add Balance", "💰 My Balance")
    keyboard.add("🛒 New Order", "📊 My Orders")
    keyboard.add("👤 Profile", "💬 Support")
    await msg.answer("📍 Main Menu:", reply_markup=keyboard)

@dp.message_handler(lambda m: m.text == "💰 My Balance")
async def my_balance(msg: types.Message):
    user_id = msg.from_user.id
    cur.execute("SELECT balance FROM users WHERE id=?", (user_id,))
    bal = cur.fetchone()[0]
    await msg.answer(f"💰 Your Balance: {bal} INR")

@dp.message_handler(lambda m: m.text == "➕ Add Balance")
async def add_balance(msg: types.Message):
    # এখানে আসল Payment Gateway integrate করতে হবে
    await msg.answer("💳 Payment system coming soon... (Razorpay/Paytm)")
    await info_bot.send_message(
        ADMIN_CHAT_ID, f"💳 {msg.from_user.id} requested to add balance."
    )

@dp.message_handler(lambda m: m.text == "🛒 New Order")
async def new_order(msg: types.Message):
    # Demo order তৈরি
    user_id = msg.from_user.id
    cur.execute("INSERT INTO orders(user_id, service, link, quantity) VALUES (?, ?, ?, ?)",
                (user_id, "Instagram Likes", "https://instagram.com/test", 100))
    conn.commit()

    await msg.answer("✅ Order Placed Successfully!")
    await info_bot.send_message(
        ADMIN_CHAT_ID, f"🛒 New Order\nUser: {user_id}\nService: Instagram Likes\nQty: 100"
    )

@dp.message_handler(lambda m: m.text == "📊 My Orders")
async def my_orders(msg: types.Message):
    user_id = msg.from_user.id
    cur.execute("SELECT order_id, service, quantity, status FROM orders WHERE user_id=?", (user_id,))
    orders = cur.fetchall()
    if not orders:
        await msg.answer("📭 No orders yet.")
    else:
        text = "📊 Your Orders:\n"
        for o in orders:
            text += f"#{o[0]} | {o[1]} | Qty: {o[2]} | Status: {o[3]}\n"
        await msg.answer(text)

@dp.message_handler(lambda m: m.text == "👤 Profile")
async def profile(msg: types.Message):
    user_id = msg.from_user.id
    cur.execute("SELECT username, balance FROM users WHERE id=?", (user_id,))
    user = cur.fetchone()
    await msg.answer(f"👤 Profile\nID: {user_id}\nUsername: @{user[0]}\nBalance: {user[1]} INR")

@dp.message_handler(lambda m: m.text == "💬 Support")
async def support(msg: types.Message):
    await msg.answer("✉️ Send your issue here. Admin will reply soon.")
    await info_bot.send_message(
        ADMIN_CHAT_ID, f"📩 Support request from {msg.from_user.id}"
    )

# ========== RUN ==========
if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)

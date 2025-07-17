const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const CHAT_ID = process.env.CHAT_ID || "";

const redirectUri = "https://vercel-tokens-catcher.vercel.app/api/ig-webhook";

const bot = new Telegraf(BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing code");
  }

  try {
    // short lived token (1h)
    const formData = new URLSearchParams();
    formData.append("client_id", process.env.IG_APP_ID);
    formData.append("client_secret", process.env.IG_APP_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirectUri);
    formData.append("code", code);
    let response = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);
    const slt = data.access_token;

    // long lived token (60d)

    const tokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.IG_APP_SECRET}&access_token=${slt}`;
    response = await fetch(tokenUrl);
    data = await response.json();
    console.log(data);
    const llt = data.access_token;
    await bot.telegram.sendMessage(
      CHAT_ID,
      `🔑 Instagram токен:\n\n\`${llt}\``,
      { parse_mode: "Markdown" }
    );

    res.status(200).send(`OK`);
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).send("Ошибка при отправке токена");
  }
};

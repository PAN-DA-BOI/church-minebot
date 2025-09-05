const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'hostname',
  port: 25565,
  username: 'SablesSilyBot',
  version: '1.21.7',
});

bot.on('spawn', () => {
  console.log('Bot has spawned in the world!');
  bot.chat('testing if this will work, gimme a sec');
});

bot.on('error', (err) => {
  console.error('Bot error:', err);
});

bot.on('end', () => {
  console.log('Bot has disconnected.');
});

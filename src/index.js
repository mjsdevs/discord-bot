const Discord = require('discord.js');
require('dotenv').config();

const { DISCORD_BOT_TOKEN: token } = process.env;

const { extract } = require('./utils');

const client = new Discord.Client();
const prefix = '/';

client.login(token);

const commandHandler = async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message
    .content
    .slice(prefix.length)
    .split(' ');

  const command = args
    .shift()
    .toLowerCase();

  switch (command) {
    case 'help':
      message.reply('Hello!');
      message.channel.send('Here\'s a list of avaliable commands:');
      message.channel.send(`- \`${prefix}help\`: Show this help.`);
      message.channel.send(`- \`${prefix}save {brifing} [tag1, tag2] <https://myLink.com>\`: Saves something to the library.`);
      break;

    case 'save':
      message.channel.send(`Tags: \`${extract({
        content: message.content,
        startMark: '[',
        endMark: ']',
      })}\``);

      message.channel.send(`Text: \`${extract({
        content: message.content,
        startMark: '{',
        endMark: '}',
      })}\``);

      message.channel.send(`Link: \`${extract({
        content: message.content,
        startMark: '<',
        endMark: '>',
      })}\``);

      break;

    default:
      break;
  }
};

client.on('message', (message) => {
  commandHandler(message);
});

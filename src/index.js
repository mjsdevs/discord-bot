const Discord = require('discord.js');
require('dotenv').config();

const { DISCORD_BOT_TOKEN: token } = process.env;

const saveToLibrary = require('./commands/saveToLibrary');
const displayHelp = require('./commands/displayHelp');

const client = new Discord.Client();
const { COMMAND_PREFIX: prefix } = process.env;

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
      displayHelp(message);
      break;

    case 'save':
      saveToLibrary(message);
      break;

    default:
      break;
  }
};

client.on('message', (message) => {
  commandHandler(message);
});

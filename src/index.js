const Discord = require('discord.js');
require('dotenv').config();

const saveToLibrary = require('./commands/saveToLibrary');
const displayHelp = require('./commands/displayHelp');

const {
  DISCORD_BOT_TOKEN: token,
  COMMAND_PREFIX: prefix,
} = process.env;

const client = new Discord.Client();
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

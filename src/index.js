import Discord from 'discord.js';
import dotenv from 'dotenv';

import saveToLibrary from './commands/saveToLibrary';
import displayHelp from './commands/displayHelp';

dotenv.config({ path: '.env' });

const prefix = '/';

const {
  DISCORD_BOT_TOKEN: token,
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

  if (args.length === 0) {
    displayHelp(message);
  } else {
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
  }
};

client.on('message', (message) => {
  commandHandler(message);
});

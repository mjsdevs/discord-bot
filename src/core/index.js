import Discord from 'discord.js';
import { save, help } from './commands';

export default class Bot {
  constructor({
    prefix,
    token,
    databaseURI,
  }) {
    console.log(prefix);
    console.log(token);
    console.log(databaseURI);

    this.prefix = prefix;
    this.token = token;
    this.databaseURI = databaseURI;
    this.client = new Discord.Client();
  }

  async handleCommand(message) {
    try {
      if (!message.content.startsWith(this.prefix) || message.author.bot) return;

      message.react('🆗');

      const args = message
        .content
        .slice(this.prefix.length)
        .split(' ');

      const command = args
        .shift()
        .toLowerCase();

      if (args.length === 0) {
        help({ message, prefix: this.prefix });
      } else {
        switch (command) {
          case 'help':
            help({ message, prefix: this.prefix });
            break;
          case 'save':
            console.log(this.databaseURI);
            save({ message, databaseURI: this.databaseURI });
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  start() {
    this.client.login(this.token);
    this.client.on('message', (message) => {
      this.handleCommand(message);
    });
  }
}

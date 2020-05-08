import Discord from 'discord.js';
import { save, help, remove } from './commands';

export default class Bot {
  constructor({
    prefix,
    token,
  }) {
    this.prefix = prefix;
    this.token = token;
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
            save({ message });
            break;
          case 'remove':
            remove({ message });
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

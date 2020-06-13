import Discord from 'discord.js';

import commands from './commands';

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

      const params = { message, prefix: this.prefix };

      commands[command || 'help'](params);
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

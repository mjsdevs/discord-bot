const { COMMAND_PREFIX: prefix } = process.env;

module.exports = (message) => {
  message.reply('Hello!');
  message.channel.send('Here\'s a list of avaliable commands:');
  message.channel.send(`- \`${prefix}help\`: Show this help.`);
  message.channel.send(`- \`${prefix}save {brifing} [tag1, tag2] <https://myLink.com>\`: Saves something to the library.`);
};

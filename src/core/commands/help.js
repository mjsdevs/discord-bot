export default ({ message, prefix }) => {
  message.reply('Hello!');
  message.channel.send('Here\'s a list of available commands:');
  message.channel.send(`- \`${prefix}help\`: Show this help.`);
  message.channel.send(`- \`${prefix}save {briefing} [tag1, tag2] <https://myLink.com>\`: Saves something to the library.`);
};

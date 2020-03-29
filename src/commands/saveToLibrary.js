const { extract } = require('../utils');

module.exports = (message) => {
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
};

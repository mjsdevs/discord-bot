const mongoose = require('mongoose');
const { extract } = require('../utils');

const { MONGODB_CONNECTION_STRING: mongoConnectionString } = process.env;

const RegisterSchema = new mongoose.Schema({
  title: String,
  url: String,
  tags: [String],
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = async (message) => {
  try {
    message.react('👍');
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const tags = extract({
      content: message.content,
      startMark: '[',
      endMark: ']',
    });

    const [title] = extract({
      content: message.content,
      startMark: '{',
      endMark: '}',
    });

    const [url] = extract({
      content: message.content,
      startMark: '<',
      endMark: '>',
    });

    await Register.create({ url, tags, title });
    message.reply(`Hello! I've created a register for:\n \`${title}\``);
  } catch (e) {
    console.log(e);
    message.channel.send('Could not create the register! Check the logs!');
  }
};

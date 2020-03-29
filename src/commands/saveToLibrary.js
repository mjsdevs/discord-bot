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
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const tags = extract({
      content: message.content,
      startMark: '[',
      endMark: ']',
    });

    const title = extract({
      content: message.content,
      startMark: '{',
      endMark: '}',
    });

    const url = extract({
      content: message.content,
      startMark: '<',
      endMark: '>',
    });

    await Register.create({ url, tags, title });
    message.channel.send('Register created');
  } catch (e) {
    message.channel.send('Could not create the register! Check the logs!');
  }
};

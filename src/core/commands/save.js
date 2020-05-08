import { extract } from '../utils';
import Register from '../models';

export default async ({ message }) => {
  try {
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

    const { _id: id } = await Register.create({ url, tags, title });
    message.reply(`Hello! I've created a register for:\n \`${title}\`(id: ${id})`);
  } catch (e) {
    console.log(e);
    message.channel.send('Could not create the register! Check the logs!');
  }
};

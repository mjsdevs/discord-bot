import Register from '../models';
import { extract } from '../utils';

export default async ({ message }) => {
  try {
    const id = extract({
      content: message.content,
      startMark: '{',
      endMark: '}',
    });

    await Register.deleteOne({ _id: id });
    message.channel.send('Register removed!');
  } catch (e) {
    console.log(e);
    message.channel.send('Could not remove the register! Check the logs!');
  }
};

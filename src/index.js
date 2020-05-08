import { connect } from 'mongoose';
import Bot from './core';
import settings from './settings';
import api from './api';

const token = process.env.DISCORD_BOT_TOKEN || settings.get('token');
const prefix = process.env.DISCORD_BOT_PREFIX || settings.get('prefix');
const databaseURI = process.env.DATABASE_URL || settings.get('databaseURI');

(async () => {
  await connect(settings.get('databaseURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const discordBot = new Bot({
  prefix,
  token,
  databaseURI,
});

api.listen(process.env.PORT || 3000);

discordBot.start();

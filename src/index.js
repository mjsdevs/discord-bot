import Bot from './core';
import settings from './settings';

const { prefix, token, databaseURI } = settings.get();

const discordBot = new Bot({
  prefix,
  token,
  databaseURI,
});

discordBot.start();

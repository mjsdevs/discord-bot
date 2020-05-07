import express from 'express';
import cors from 'cors';
import Bot from './core';
import settings from './settings';

const token = process.env.DISCORD_BOT_TOKEN || settings.get('token');
const prefix = process.env.DISCORD_BOT_PREFIX || settings.get('prefix');
const databaseURI = process.env.DATABASE_URL || settings.get('databaseURI');

const discordBot = new Bot({
  prefix,
  token,
  databaseURI,
});

const app = express();

app.use(cors());

app.route('/').all((req, res) => {
  res.status(200).send({ status: 'Alive' });
});

app.listen(process.env.PORT || 3000);

discordBot.start();

import convict from 'convict';
import path from 'path';

const settings = convict({
  env: {
    docs: 'The application environment',
    formt: ['production', 'test', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  token: {
    doc: 'The bot token, generated on discord developer panel',
    format: String,
    env: 'DISCORD_BOT_TOKEN',
  },
  prefix: {
    doc: 'The bot commands prefix',
    format: String,
    env: 'DISCORD_BOT_PREFIX',
    default: '/',
  },
  databaseURI: {
    doc: 'The database connection string',
    format: String,
    default: 'mongodb://root:example@localhost:27017/pilux-db?authSource=admin',
    env: 'DATABASE_URL',
  },
});

if (settings.get('env') !== 'production') {
  settings.loadFile(path.join(__dirname, `${settings.get('env')}.json`));
}

export default settings;

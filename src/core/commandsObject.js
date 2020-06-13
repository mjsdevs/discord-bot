import { save, help, remove } from './commands';

export default (params) => ({
  help: help(params),
  save: save(params),
  remove: remove(params),
});

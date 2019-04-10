import { homedir } from 'os';
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default class {
  constructor(options = {}) {
    this.setOptions(options);
    this.init();

    return collection => this.db.get(collection);
  }

  setOptions(options) {
    this.options = {
      path: path.join(homedir(), '.pigment'),
      file: undefined,
      defaults: {},
      ...options,
    };
  }

  init() {
    const adapter = new FileSync(path.join(this.options.path, this.options.file));
    this.db = lowdb(adapter);

    this.db.defaults(this.options.defaults).write();
  }
}

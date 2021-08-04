import fs from 'fs';
import { homedir } from 'os';
import path from 'path';
import lowdb from 'lowdb';
import lodashId from 'lodash-id';
import FileSync from 'lowdb/adapters/FileSync';
import { name } from '@/../package.json';

export default class {
  constructor(options = {}) {
    this.setOptions(options);
    this.createFolder();
    this.init();

    return () => this.db;
  }

  setOptions(options) {
    this.options = {
      path: path.join(homedir(), `.${name}${process.env.NODE_ENV === 'development' ? '-dev' : ''}`),
      file: undefined,
      defaults: {},
      ...options,
    };
  }

  createFolder() {
    if (fs.existsSync(this.options.path)) return;
    fs.mkdirSync(this.options.path);
  }

  init() {
    const adapter = new FileSync(path.join(this.options.path, this.options.file));
    this.db = lowdb(adapter);
    this.db._.mixin(lodashId);

    this.db.defaults(this.options.defaults).write();
  }
}

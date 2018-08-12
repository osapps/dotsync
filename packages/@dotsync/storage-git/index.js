const exec = require('child_process').execSync;
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');

class Git {
  constructor(configdir) {
    this.name = 'Git';
    this.location = 'URL to git repository';
    this.description = 'Use git repository to store your dotfiles';

    this.configdir = configdir;
    this.dataFolder = path.join(this.configdir, 'data');
  }

  run(cmd) {
    return exec(cmd, { cwd: this.dataFolder, encoding: 'utf8' });
  }

  valid(value) {
    try {
      exec(`git ls-remote ${value}`);
    } catch (e) {
      return 'Repository not found';
    }

    return '';
  }

  init(value) {
    mkdirp.sync(this.dataFolder);

    try {
      this.run(`git init`);
      this.run(`git remote add dotsync ${value}`);
      this.run(`git fetch dotsync`);
    } catch (e) {
      rimraf.sync(this.dataFolder);
      // TODO: Pinpoint error
      return 'Unable to fetch git repository';
    }

    return '';
  }

  latestVersion() {
    try {
      this.run(`git`);
    } catch (e) {
      // TODO: Better error message here
      return 'Unable to get the latest version';
    }
  }

  beforeRestore() {
    // Git pull
  }

  afterBackup() {
    // Git push
  }
};

module.exports = Git;

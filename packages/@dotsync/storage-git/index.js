const exec = require('child_process').exec;

class Git {
  constructor() {
    this.name = 'Git';
    this.location = 'URL to git repository';
    this.description = 'Use git repository to store your dotfiles';
  }

  beforeRestore() {
    // Git pull
  }

  afterBackup() {
    // Git push
  }
};

module.exports = Git;

const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const async = require('async');

class Node {
  constructor({ datadir, runner }) {
    this.name = 'node';
    this.description = 'Node.js packages and configuration';

    this.datadir = datadir;
    this.runner = runner;
  }

  restore(data, cb) {
    const cmd = data.binary || 'npm';

    this.list(cmd, (err, installed) => {
      if (err) {
        return cb(err);
      }

      const toInstall = data.packages.filter(x => installed.indexOf(x.name) === -1);

      async.eachSeries(toInstall, (item, callback) => {
        this.runner.run(`${cmd} install --global ${item.name}`, callback);
      }, cb);
    });
  }

  list(cmd, cb) {
    exec(`${cmd} list --global --depth=0 --json`, {
      encoding: 'utf8',
    }, (err, stdout, stderr) => {
      if (err) {
        return cb(err);
      }

      cb(null, Object.keys(JSON.parse(stdout).dependencies));
    });
  }
};

Node.expand = (options) => {
  return [
    {
      name: '@dotsync/plugin-secret',
      data: {
        paths: [
          {
            source: options.data.npmrc,
            destination: path.join(os.homedir(), '.npmrc'),
          },
        ],
      },
    },
    {
      name: '@dotsync/plugin-brew',
      data: {
        kegs: [
          {
            name: 'node',
          },
        ],
      },
    },
  ];
};

module.exports = Node;

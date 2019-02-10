import fs from 'fs';
import path from 'path';

export default {
  read(dir, type) {
    const file = path.resolve(dir, `${type}.json`);
    let data = '{}';

    if (fs.existsSync(file)) {
      data = fs.readFileSync(file, { encoding: 'utf8' });
    }

    return JSON.parse(data);
  },

  write(dir, type, data) {
    const file = path.resolve(dir, `${type}.json`);

    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, { encoding: 'utf8' });
  },
};

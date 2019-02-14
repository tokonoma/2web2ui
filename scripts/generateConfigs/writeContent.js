const fs = require('fs');
const paths = require('../../config/paths');

const writeContent = (content) => {
  const dir = `${paths.appBuild}/static/js`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(`${dir}/production.js`, content);
}

module.exports = writeContent;

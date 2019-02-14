const prettier = require('prettier');

const constructContent = ({ alias, host, nextHost, originHost, tenantId, ...config }) => {
  return config;
}

const constructCombinedContent = (configs) => {
  const content = `
    window.SP = window.SP || {};
    window.SP.productionConfig = ${JSON.stringify(configs, null, 2)};
  `;

  return prettier.format(content, { parser: 'babylon', singleQuote: false });
}

module.exports = {
  constructContent,
  constructCombinedContent
};

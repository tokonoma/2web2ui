const prettier = require('prettier');

const constructContent = ({ alias, context, host, tenantId, ...config }) => {
  const content = `
    window.SP = window.SP || {};
    window.SP.productionConfig = ${JSON.stringify(config)};
  `;

  return prettier.format(content, { parser: 'babylon', singleQuote: true });
}

module.exports = constructContent;

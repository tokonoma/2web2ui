const _ = require('lodash');
const defaultTemplate = require('./defaultTemplate');

const constructConfig = (tenant) => _.merge(
  defaultTemplate(tenant),
  tenant
);

module.exports = constructConfig;

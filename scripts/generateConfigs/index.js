const constructConfig = require("./constructConfig");
const { constructContent, constructCombinedContent } = require("./constructContent");
const tenants = require("./tenants");
const writeContent = require("./writeContent");

// Generate all static tenant configurations
const generateConfigs = () => {
  const allConfigs = {};
  Object.keys(tenants).forEach((environment) => {
    Object.keys(tenants[environment]).forEach((tenantId) => {
      const config = constructConfig({ ...tenants[environment][tenantId], tenantId }, environment);
      const content = constructContent(config);

      if (config.nextHost) {
        allConfigs[config.nextHost] = content;
      }

      if (config.originHost) {
        allConfigs[config.originHost] = content;
      }

      allConfigs[config.host] = content;
    });
  });

  return JSON.stringify(allConfigs);
};

module.exports = generateConfigs;

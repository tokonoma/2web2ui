const constructConfig = require("./constructConfig");
const constructContent = require("./constructContent");
const tenants = require("./tenants");

// Generate all static tenant configurations
const generateConfigs = () => {
  const allConfigs = {};
  Object.keys(tenants).forEach((environment) => {
    Object.keys(tenants[environment]).forEach((tenantId) => {
      const config = constructConfig({ ...tenants[environment][tenantId], environment, tenantId }, environment);
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

  return allConfigs;
};

module.exports = generateConfigs;

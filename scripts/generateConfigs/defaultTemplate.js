// Generate default configurations with a tenant
const defaultTemplate = (tenant) => {
  const identifier = tenant.alias || tenant.tenantId;

  return {
    featureFlags: {},
    host: `${identifier}.e.sparkpost.com`,
    smtpAuth: {
      enabled: true,
      port: 587,
      username: identifier
    },
    support: {
      algolia: {
        apiKey: '9ba87280f36f539fcc0a318c2d4fcfe6',
        appID: 'SFXAWCYDV8'
      },
      enabled: true
    },
    tenant: tenant.tenantId
  };
};

module.exports = defaultTemplate;

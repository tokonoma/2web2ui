// Generate default configurations with a tenant
const defaultTemplate = (tenant) => ({
  featureFlags: {},
  host: `${tenant.tenantId}.e.sparkpost.com`,
  smtpAuth: {
    enabled: true,
    port: 587,
    username: tenant.tenantId
  },
  support: {
    algolia: {
      apiKey: '9ba87280f36f539fcc0a318c2d4fcfe6',
      appID: 'SFXAWCYDV8'
    },
    enabled: true
  }
});

module.exports = defaultTemplate;

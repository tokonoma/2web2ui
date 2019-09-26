// Generate default configurations with a tenant
const defaultTemplate = (tenant) => ({
  featureFlags: {},
  host: `${tenant.tenantId}.e.sparkpost.com`,
  smtpAuth: {
    enabled: true,
    port: 587,
    username: tenant.tenantId
  }
});

module.exports = defaultTemplate;

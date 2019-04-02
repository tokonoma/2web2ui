/**
 * This is a list of all production tenants and their specific configurations
 * @example
 *   {
 *     // the unique tenant id
 *     myTenant: {
 *
 *       // an alternative identifier for tenantId
 *       alias: 'meTenant',
 *
 *       // host to "next" deployment
 *       nextHost: 'next.tst.sparkpost.com'
 *
 *       // host to back door
 *       originHost: 'origin.tst.sparkpost.com'
 *
 *       // all other values are overrides for the default template
 *     }
 *   }
 */
const productionTenants = {
  spceu: {
    apiBase: 'https://api.eu.sparkpost.com/api',
    bounceDomains: {
      cnameValue: 'eu.sparkpostmail.com',
      mxValue: 'smtp.eu.sparkpostmail.com'
    },
    brightback: {
      freePlan: 'free500-SPCEU-1018'
    },
    crossLinkTenant: 'spc',
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true,
      has_signup: true
    },
    gtmId: 'GTM-WN7C84',
    host: 'app.eu.sparkpost.com',
    siftScience: {
      accountPrefix: 'spceu-',
      id: '7c5f68d795'
    },
    smtpAuth: {
      host: 'smtp.eu.sparkpostmail.com',
      username: 'SMTP_Injection',
      alternativePort: 2525
    },
    splashPage: '/dashboard',
    trackingDomains: {
      cnameValue: 'eu.spgo.io'
    },
    zuora: {
      baseUrl: 'https://api.zuora.com/rest/v1'
    }
  },
  spc: {
    apiBase: 'https://api.sparkpost.com/api',
    bounceDomains: {
      cnameValue: 'sparkpostmail.com',
      mxValue: 'smtp.sparkpostmail.com'
    },
    crossLinkTenant: 'spceu',
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true,
      has_signup: true
    },
    gtmId: 'GTM-WN7C84',
    host: 'app.sparkpost.com',
    nextHost: 'phoenix-next-prd.sparkpost.com',
    originHost: 'phoenix-origin-prd.sparkpost.com',
    siftScience: {
      id: '7c5f68d795'
    },
    smtpAuth: {
      host: 'smtp.sparkpostmail.com',
      username: 'SMTP_Injection',
      alternativePort: 2525
    },
    splashPage: '/dashboard',
    trackingDomains: {
      cnameValue: 'spgo.io'
    },
    zuora: {
      baseUrl: 'https://api.zuora.com/rest/v1'
    }
  },
  demo: {
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true
    },
    trackingDomains: {
      cnameValue: 'track.demo-t.sparkpostelite.com'
    }
  },
  mtas4tenant: {
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true
    },
    smtpAuth: {
      alternativePort: 2525
    }
  },
  productionmtas: {
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true
    },
    smtpAuth: {
      alternativePort: 2525
    }
  },
  productionmtas2: {
    featureFlags: {
      allow_anyone_at_verification: true,
      allow_default_signing_domains_for_ip_pools: true
    },
    smtpAuth: {
      alternativePort: 2525
    }
  }
};

module.exports = productionTenants;

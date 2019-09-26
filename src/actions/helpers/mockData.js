export const MOCK_BUNDLES = {
  'plans': [
    {
      'product': 'messaging',
      'plan': '50K-starter-0519',
      'volume': 50000,
      'limit': 150000,
      'price': 20,
      'overage': 1,
      'billingId': '2c92c0f96a346078016a4ff143fb2a5a'
    },
    {
      'product': 'messaging',
      'plan': '100K-premier-0519',
      'volume': 100000,
      'limit': 300000,
      'price': 75,
      'overage': 0.85,
      'billingId': '2c92c0f96a346078016a4ff143fb2a5a'
    },
    {
      'product': 'messaging',
      'plan': '250K-premier-0519',
      'volume': 250000,
      'limit': 750000,
      'price': 170,
      'overage': 0.85,
      'billingId': '2c92c0f96a346078016a4ff143fb2a5a'
    },
    {
      'product': 'subaccounts',
      'plan': 'subaccounts-0519',
      'limit': 15
    },
    {
      'product': 'sso',
      'plan': 'sso-0519'
    },
    {
      'product': 'tfa_required',
      'plan': 'tfa-required-0519'
    },
    {
      'product': 'dedicated_ip',
      'plan': 'ip-0519',
      'volume': 1,
      'limit': 4,
      'billingId': '2c92c0f96a346078016a4ff143fb2a5a'
    }
  ],
  'bundles': [
    {
      'bundle': '50K-starter-0519',
      'status': 'public',
      'tier': 'starter',
      'plans': [
        '50K-starter-0519'
      ]
    },
    {
      'bundle': '100K-premier-0519',
      'status': 'public',
      'tier': 'premier',
      'plans': [
        '100K-premier-0519',
        'subaccounts-0519',
        'sso-0519',
        'tfa-required-0519',
        'ip-0519'
      ]
    },
    {
      'bundle': '250K-premier-0519',
      'status': 'public',
      'tier': 'premier',
      'plans': [
        '250K-premier-0519',
        'subaccounts-0519',
        'sso-0519',
        'tfa-required-0519',
        'ip-0519'
      ]
    }
  ]
};

export const getMockSubscription = (index = 0) => {
  const mockData = [{
    type: 'active',
    products: [
      { product: 'messaging', plan: '100K-premier-0519' },
      {
        product: 'subaccounts',
        plan: 'subaccounts-0519',
        quantity: 17,
        limit_override: 20
      },
      {
        product: 'sso',
        plan: 'sso-0519'
      },
      {
        product: 'tfa_required',
        plan: 'tfa-required-0519'
      }
    ]
  }, {
    type: 'active',
    products: [
      { product: 'messaging', plan: '100K-premier-0519' },
      {
        product: 'subaccounts',
        plan: 'subaccounts-0519',
        quantity: 16,
        limit_override: 20
      },
      {
        product: 'sso',
        plan: 'sso-0519'
      },
      {
        product: 'tfa_required',
        plan: 'tfa-required-0519'
      }
    ]
  }, {
    type: 'active',
    products: [
      { product: 'messaging', plan: '100K-premier-0519' },
      {
        product: 'subaccounts',
        plan: 'subaccounts-0519',
        quantity: 0,
        limit_override: 20
      },
      {
        product: 'sso',
        plan: 'sso-0519'
      },
      {
        product: 'tfa_required',
        plan: 'tfa-required-0519'
      }
    ]
  }];

  return mockData[index] || mockData[0];
};

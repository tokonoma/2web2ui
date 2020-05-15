const productionConfig = {
  brightback: {
    downgradeToFreeConfig: {
      app_id: '9N0rWBvKGR', //Downgrade to prod
    },
    cancelConfig: {
      app_id: 'RYeoK4Dp3a', //Cancel Prod id
    },
  },
  segment: {
    enabled: true,
    publicKey: '6NftxrUb0QfhkIaOqcpbfxjZDhvNEExm',
  },
  sentry: {
    projectId: 237613,
    publicKey: '014f9707c27b4e7ea90aff051a82e561',
  },
  support: {
    algolia: {
      apiKey: '9ba87280f36f539fcc0a318c2d4fcfe6',
      appID: 'SFXAWCYDV8',
      index: 'production_site_posts_support_article',
    },
  },
  vwo: {
    enabled: true,
  },
};

export default productionConfig;

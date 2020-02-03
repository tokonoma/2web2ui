export default () => ({
  results: [
    {
      label: 'Metrics: Read-only',
      description: 'Provides the GET grant for the Metrics API.',
      key: 'metrics/view',
    },
    {
      label: 'Events Search: Read-only',
      description: 'Provides the GET grants for the Message Events and Events Search API.',
      key: 'message_events/view',
    },
    {
      label: 'Event Webhooks: Read-only',
      description: 'Provides the GET grant for the Event Webhooks API.',
      key: 'webhooks/view',
    },
    {
      label: 'Event Webhooks: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Event Webhooks API.',
      key: 'webhooks/modify',
    },
    {
      label: 'Templates: Read-only',
      description: 'Provides the GET grant for the Snippets and Templates API.',
      key: 'templates/view',
    },
    {
      label: 'Templates: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Snippets and Templates API.',
      key: 'templates/modify',
    },
    {
      label: 'Templates: Preview',
      description: 'Provides the POST grant for the Template Previews API.',
      key: 'templates/preview',
    },
    {
      label: 'Transmissions: Read-only',
      description: 'Provides the GET grant for the Transmissions API.',
      key: 'transmissions/view',
    },
    {
      label: 'Transmissions: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Transmissions API.',
      key: 'transmissions/modify',
    },
    {
      label: 'Recipient Lists: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Recipient Lists API.',
      key: 'recipient_lists/manage',
    },
    {
      label: 'Tracking Domains: Read-only',
      description: 'Provides the GET grant for the Tracking Domains API.',
      key: 'tracking_domains/view',
    },
    {
      label: 'Tracking Domains: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Tracking Domains API.',
      key: 'tracking_domains/manage',
    },
    {
      label: 'Sending Domains: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Sending Domains API.',
      key: 'sending_domains/manage',
    },
    {
      label: 'Inbound Domains: Read/Write',
      description: 'Provides GET, POST, and DELETE grants for the Inbound Domains API.',
      key: 'inbound_domains/manage',
    },
    {
      label: 'Suppression Lists: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Suppression Lists API.',
      key: 'suppression_lists/manage',
    },
    {
      label: 'Relay Webhooks: Read-only',
      description: 'Provides the GET grant for the Relay Webhooks API.',
      key: 'relay_webhooks/view',
    },
    {
      label: 'Relay Webhooks: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Relay Webhooks API.',
      key: 'relay_webhooks/modify',
    },
    { key: 'users/self-manage' },
    { key: 'users/manage' },
    { key: 'users/token-manage' },
    { key: 'grants/view' },
    { key: 'api_keys/manage' },
    { key: 'account/manage' },
    {
      label: 'Subaccounts: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the Subaccounts API.',
      key: 'subaccount/manage',
    },
    {
      label: 'Subaccounts: Read',
      description: 'Provides GET grants for the Subaccounts API.',
      key: 'subaccount/view',
    },
    {
      label: 'IP Pools: Read/Write',
      description: 'Provides GET, POST, PUT, and DELETE grants for the IP Pools API.',
      key: 'ip_pools/manage',
    },
    {
      label: 'IP Pools: Read',
      description: 'Provides GET grants for the IP Pools API.',
      key: 'ip_pools/view',
    },
    { key: 'messaging-tools/manage' },
    {
      label: 'A/B Testing: Read/Write',
      description: 'Provides the GET, POST, PUT and DELETE grants for the AB-Testing API.',
      key: 'ab-testing/manage',
    },
    {
      label: 'Alerts: Read/Write',
      description: 'Provides the GET, POST, PUT and DELETE grants for the Alerts API.',
      key: 'alerts/manage',
    },
    {
      label: 'Recipient Validation: Read',
      description: 'Provides the GET Recipient Validation API.',
      key: 'recipient-validation/preview',
    },
    {
      label: 'Recipient Validation: Read/Write',
      description:
        'Provides the GET, POST, PUT and DELETE grants for the Recipient Validation API.',
      key: 'recipient-validation/manage',
    },
    {
      label: 'Signals: Read/Write',
      description: 'Provides the GET, POST, PUT and DELETE grants for the Signals API.',
      key: 'signals/manage',
    },
    { key: 'support/manage' },
    {
      label: 'Incoming Events: Write',
      description: 'Provides the POST grants for the Incoming Events API.',
      key: 'events/ingest',
    },
  ],
});

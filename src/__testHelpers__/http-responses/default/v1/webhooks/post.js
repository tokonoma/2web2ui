// POST /webhooks
export default ({ subaccount }) => ({
  results: { id: 'webhook-test-name', subaccount }
});

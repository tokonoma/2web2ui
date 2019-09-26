// GET /subaccounts
export default () => ({
  results: [
    {
      customer_id: 123456,
      id: 1,
      name: 'subaccount-un',
      compliance_status: 'active',
      status: 'active'
    },
    {
      customer_id: 123456,
      id: 2,
      name: 'subaccount-deux',
      compliance_status: 'active',
      status: 'terminated'
    }
  ]
});

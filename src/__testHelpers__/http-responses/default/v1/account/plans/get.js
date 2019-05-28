// GET /account/plans

export default () => ({
  results: [
    { code: 'free-0817', name: 'Free', status: 'public', volume: 100, monthly: 0, isFree: true },
    { code: '50K-0817', name: '50K', status: 'public', volume: 50000, monthly: 9, billingId: '50k-billingid', isFree: false },
    { code: 'large', name: 'Largo', status: 'public', volume: 3500000, monthly: 149, billingId: 'largo-billingid', isFree: false }
  ]
});

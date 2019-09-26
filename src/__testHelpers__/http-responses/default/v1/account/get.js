// GET /account

export default () => {
  const account = {
    anniversary_date: '2018-05-01T08:00:00.000Z',
    company_name: null,
    country_code: '',
    created: '2018-04-13T03:07:48.627Z',
    options: {
      smtp_tracking_default: false,
      ui: {}
    },
    service_level: 'standard',
    status: 'active',
    status_reason_category: '',
    status_updated: '2018-04-13T03:07:48.627Z',
    updated: '2018-06-12T02:16:30.576Z',
    subscription: {
      code: 'free-0817',
      name: 'Free',
      plan_volume: 500,
      self_serve: true,
      type: 'default',
      recurring_charge: 0,
      period: 'month'
    },
    support: {
      phone: true,
      online: true
    }
  };
  return { results: account };
};

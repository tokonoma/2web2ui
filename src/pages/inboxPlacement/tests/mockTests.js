/* eslint-disable max-lines */
export const tests = [{
  id: 1,
  test_name: 'test_name_test1',
  subject: 'Your Subject Line Goes Here and Can be long 1',
  from_address: 'aubrey.altmann@sparkpost.com',
  start_time: '2019-08-01T12:30:06-04:00',
  end_time: '2019-06-01T12:35:06-04:00',
  status: 'running',
  seedlist_count: 11,
  placement: {
    inbox_pct: 0.397,
    spam_pct: 0.015,
    missing_pct: 0.588
  },
  authentication: {
    spf_pct: null,
    dkim_pct: null,
    dmarc_pct: null
  }
},
{
  id: 2,
  test_name: 'test_name_test2',
  subject: 'Subject Line Goes Here and Can be long 2',
  from_address: 'aubrey.altmann@sparkpost.com',
  start_time: '2019-06-01T12:30:06-04:00',
  end_time: '2019-06-01T12:35:06-04:00',
  status: 'completed',
  seedlist_count: 12,
  placement: {
    inbox_pct: 0.897,
    spam_pct: 0.015,
    missing_pct: 0.088
  },
  authentication: {
    spf_pct: null,
    dkim_pct: null,
    dmarc_pct: null
  }
},
{
  id: 3,
  test_name: 'test_name_test3',
  subject: 'Subject Line Goes Here and Can be long 3',
  from_address: 'aubrey.altmann@sparkpost.com',
  start_time: '2019-06-01T12:30:06-04:00',
  end_time: '2019-06-01T12:35:06-04:00',
  status: 'stopped',
  seedlist_count: 13,
  placement: {
    inbox_pct: 0.897,
    spam_pct: 0.015,
    missing_pct: 0.088
  },
  authentication: {
    spf_pct: null,
    dkim_pct: null,
    dmarc_pct: null
  }
}];

import React from 'react';
import { shallow, mount } from 'enzyme';

import ProvidersBreakdown, { GroupPercentage } from '../ProvidersBreakdown';
import { PLACEMENT_FILTER_TYPES } from '../TestDetails';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Component: ProvidersBreakdown', () => {
  const subject = ({ ...props }) => shallow(<ProvidersBreakdown data={[]} {...props} />);
  const mountedSubject = ({ ...props }) => mount(
    <Router><ProvidersBreakdown data={[]} {...props} /></Router>
  );
  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('matches snapshot with provider data', () => {
    const data = [
      {
        'mailbox_provider': 'dogmail.com',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        },
        'authentication': {
          'spf_pct': 0,
          'dkim_pct': 0,
          'dmarc_pct': 1
        }
      },
      {
        'mailbox_provider': 'doghouseinbox.com',
        'placement': {
          'inbox_pct': 0.8,
          'spam_pct': 0.1,
          'missing_pct': 0.1
        },
        'authentication': {
          'spf_pct': 0.8,
          'dkim_pct': 0.1,
          'dmarc_pct': 0.1
        }
      }
    ];

    expect(subject({ data })).toMatchSnapshot();
  });

  it('matches snapshot with region data', () => {
    const data = [
      {
        'region': 'north america',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        },
        'authentication': {
          'spf_pct': 0,
          'dkim_pct': 0,
          'dmarc_pct': 1
        }
      },
      {
        'region': 'europe',
        'placement': {
          'inbox_pct': 0.8,
          'spam_pct': 0.1,
          'missing_pct': 0.1
        },
        'authentication': {
          'spf_pct': 0.8,
          'dkim_pct': 0.1,
          'dmarc_pct': 0.1
        }
      }
    ];
    expect(subject({ data, type: PLACEMENT_FILTER_TYPES.REGION })).toMatchSnapshot();
  });

  it('renders correctly with region data', () => {
    const data = [
      {
        'id': 25,
        'region': 'north america',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        },
        'authentication': {
          'spf_pct': 0,
          'dkim_pct': 0,
          'dmarc_pct': 1
        }
      },
      {
        'region': 'europe',
        'placement': {
          'inbox_pct': 0.8,
          'spam_pct': 0.1,
          'missing_pct': 0.1
        },
        'authentication': {
          'spf_pct': 0.8,
          'dkim_pct': 0.1,
          'dmarc_pct': 0.1
        }
      }
    ];
    const wrapper = mountedSubject({ data, type: PLACEMENT_FILTER_TYPES.REGION });
    expect(wrapper).toHaveTextContent('North America');
    expect(wrapper).toHaveTextContent('Europe');
  });

  it('renders correctly with provider data', () => {
    const data = [
      {
        'id': 25,
        'region': 'north america',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        },
        'mailbox_provider': 'doghouseinbox.com',
        'authentication': {
          'spf_pct': 0,
          'dkim_pct': 0,
          'dmarc_pct': 1
        }
      },
      {
        'region': 'europe',
        'placement': {
          'inbox_pct': 0.8,
          'spam_pct': 0.1,
          'missing_pct': 0.1
        },
        'authentication': {
          'spf_pct': 0.8,
          'dkim_pct': 0.1,
          'dmarc_pct': 0.1
        }
      }
    ];
    const wrapper = mountedSubject({ data, type: PLACEMENT_FILTER_TYPES.PROVIDER });
    expect(wrapper).toHaveTextContent('doghouseinbox.com');
  });

  describe('SubComponent: GroupPercentage', () => {
    it('renders percentage correctly', () => {
      expect(shallow(<GroupPercentage value={0.2}/>)).toMatchSnapshot();
    });
  });

});

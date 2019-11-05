import React from 'react';
import { shallow } from 'enzyme';

import { PLACEMENT_FILTER_TYPES } from '../../constants/types';
import PlacementBreakdown, { GroupPercentage, HeaderComponent, RowComponent } from '../PlacementBreakdown';

describe('Component: PlacementBreakdown', () => {

  const data = [
    {
      mailbox_provider: 'dogmail.com',
      region: 'north america',
      placement: {
        inbox_pct: 0,
        spam_pct: 0,
        missing_pct: 1
      },
      authentication: {
        spf_pct: 0,
        dkim_pct: 0,
        dmarc_pct: 1
      }
    },
    {
      mailbox_provider: 'doghouseinbox.com',
      region: 'europe',
      placement: {
        inbox_pct: 0.8,
        spam_pct: 0.1,
        missing_pct: 0.1
      },
      authentication: {
        spf_pct: 0.8,
        dkim_pct: 0.1,
        dmarc_pct: 0.1
      }
    }
  ];

  const subject = ({ ...props }) => shallow(<PlacementBreakdown data={[]} {...props}/>);

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

  describe('SubComponent: GroupPercentage', () => {
    it('renders percentage correctly', () => {
      expect(shallow(<GroupPercentage value={0.2}/>)).toMatchSnapshot();
    });
  });

  describe('RowComponent', () => {
    const { mailbox_provider, region, placement, authentication } = data[0];
    it('renders region correctly', () => {
      expect(shallow(
        <RowComponent
          id={1}
          mailbox_provider={mailbox_provider}
          region={region}
          type={PLACEMENT_FILTER_TYPES.REGION}
          placement={placement}
          authentication={authentication}
        />)).toMatchSnapshot();
    });
    it('renders mailbox provider correctly', () => {
      expect(shallow(
        <RowComponent
          id={1}
          mailbox_provider={mailbox_provider}
          region={region}
          type={PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER}
          placement={placement}
          authentication={authentication}
        />)).toMatchSnapshot();
    });
  });

  describe('HeaderComponent', () => {
    it('renders correctly', () => {
      expect(shallow(<HeaderComponent/>)).toMatchSnapshot();
    });
  });

});

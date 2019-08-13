import React from 'react';
import { shallow } from 'enzyme';

import ProvidersBreakdown, { GroupPercentage } from '../ProvidersBreakdown';

describe('Component: ProvidersBreakdown', () => {
  const subject = ({ ...props }) => shallow(<ProvidersBreakdown data={[]} {...props}/>);

  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    const data = [
      {
        'mailbox_provider': 'dogmail.com',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        }
      },
      {
        'mailbox_provider': 'doghouseinbox.com',
        'placement': {
          'inbox_pct': 0.8,
          'spam_pct': 0.1,
          'missing_pct': 0.1
        }
      }
    ];

    expect(subject({ data })).toMatchSnapshot();
  });

  describe('SubComponent: GroupPercentage', () => {
    it('renders percentage correctly', () => {
      expect(shallow(<GroupPercentage value={0.2}/>)).toMatchSnapshot();
    });
  });

});

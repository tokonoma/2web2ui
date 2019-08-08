import React from 'react';
import { shallow } from 'enzyme';
import TestDetails, { TestInfoBlock } from '../TestDetails';

'../TestDetails';

describe('Component: TestDetails', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      currentTest: {
        start_time: '2019-07-08T15:49:56.954Z"',
        end_time: null,
        subject: 'Fooo'
      },
      inboxPlacementsByProvider: []
    };
    return shallow(<TestDetails {...defaults} {...props} />);
  };

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders providers breakdown correctly', () => {
    const inboxPlacementsByProvider = [
      {
        'mailbox_provider': 'dogmail.com',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        }
      }
    ];

    expect(subject({ inboxPlacementsByProvider }).find('ProvidersBreakdown')).toMatchSnapshot();
  });

  describe('Component: TestInfoBlock', () => {
    it('renders the label and value', () => {
      expect(shallow(<TestInfoBlock label='Foo' value='bar' />)).toMatchSnapshot();
    });
  });
});

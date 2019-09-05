import React from 'react';
import { shallow } from 'enzyme';
import TestDetails from '../TestDetails';

jest.mock('date-fns', () => ({ format: jest.fn().mockReturnValue('Jul 8th 2019 11:49am') }));

describe('Component: TestDetails', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      details: {
        start_time: '2019-07-08T15:49:56.954Z',
        end_time: null,
        subject: 'Fooo',
        test_name: 'Baz'
      },
      placementsByProvider: []
    };
    return shallow(<TestDetails {...defaults} {...props} />);
  };

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders test name as None when it does not exist', () => {
    const detailsWithoutName = {
      start_time: '2019-07-08T15:49:56.954Z',
      end_time: null,
      subject: 'Fooo'
    };
    const wrapper = subject({ details: detailsWithoutName });
    expect(wrapper.find('InfoBlock').at(3)).toHaveProp('value', 'None');
  });

  it('renders providers breakdown correctly', () => {
    const placementsByProvider = [
      {
        'mailbox_provider': 'dogmail.com',
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        }
      }
    ];

    expect(subject({ placementsByProvider }).find('ProvidersBreakdown').prop('data')).toEqual(placementsByProvider);
  });
});

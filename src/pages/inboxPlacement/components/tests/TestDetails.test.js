import React from 'react';
import { shallow } from 'enzyme';
import TestDetails from '../TestDetails';
import { PLACEMENT_FILTER_TYPES } from '../../constants/types';

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

    expect(subject({ placementsByProvider }).find('PlacementBreakdown').prop('data')).toEqual(placementsByProvider);
  });

  it('changes placement data when changing select', () => {
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
    const placementsByRegion = [
      {
        'placement': {
          'inbox_pct': 0,
          'spam_pct': 0,
          'missing_pct': 1
        },
        'region': 'north america'
      }
    ];
    const wrapper = subject({ placementsByProvider, placementsByRegion });
    // Default data
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual(placementsByProvider);

    // Change to Region Filter
    wrapper.find('Select').simulate('change', { target: { value: PLACEMENT_FILTER_TYPES.REGION }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual(placementsByRegion);

    // Change back to Mailbox Provider filter
    wrapper.find('Select').simulate('change', { target: { value: PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual(placementsByProvider);
  });
});

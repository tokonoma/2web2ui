import React from 'react';
import { shallow } from 'enzyme';
import TestDetails from '../TestDetails';
import { PLACEMENT_FILTER_TYPES } from '../../constants/types';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
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

  it('changes placement data when using search bar on providers list', () => {
    const dogmail = {
      'mailbox_provider': 'dogmail.net',
      'region': 'north america',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const gmail = {
      'mailbox_provider': 'gmail.com',
      'region': 'europe',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const hotmail = {
      'mailbox_provider': 'hotmail.com',
      'region': 'global',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const placementsByProvider = [dogmail, gmail, hotmail];

    const wrapper = subject({ placementsByProvider });

    // Match one result
    wrapper.find('TextField').simulate('change', { target: { value: 'net' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([dogmail]);

    // Match more than one result
    wrapper.find('TextField').simulate('change', { target: { value: 'gmail' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([dogmail, gmail]);

    // No results
    wrapper.find('TextField').simulate('change', { target: { value: 'this wont match anything' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([]);

    // Search by case insensitive region match
    wrapper.find('TextField').simulate('change', { target: { value: 'america' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([dogmail]);
  });

  it('changes placement data when using search bar on regions list', () => {
    const northAmerica = {
      'region': 'north america',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const southAmerica = {
      'region': 'south america',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const europe = {
      'region': 'europe',
      'placement': {
        'inbox_pct': 0,
        'spam_pct': 0,
        'missing_pct': 1
      }
    };
    const placementsByRegion = [northAmerica, southAmerica, europe];

    const wrapper = subject({ placementsByRegion });

    // Change to Region list
    wrapper.find('Select').simulate('change', { target: { value: PLACEMENT_FILTER_TYPES.REGION }});

    // Match one result
    wrapper.find('TextField').simulate('change', { target: { value: 'north' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([northAmerica]);

    // Match more than one result
    wrapper.find('TextField').simulate('change', { target: { value: 'america' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([northAmerica, southAmerica]);

    // No results
    wrapper.find('TextField').simulate('change', { target: { value: 'this wont match anything' }});
    expect(wrapper.find('PlacementBreakdown').prop('data')).toEqual([]);
  });
});

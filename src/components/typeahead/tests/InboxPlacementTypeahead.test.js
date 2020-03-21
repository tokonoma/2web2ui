import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import TestApp from 'src/__testHelpers__/TestApp';
import { InboxPlacementTypeahead } from '../InboxPlacementTypeahead';

const results = {
  from_domains: ['test.com'],
  mailbox_providers: ['provider'],
  regions: ['north'],
  sending_ips: ['123.456.1.1'],
};

const now = moment.utc(new Date('2019-08-10T12:30:00-04:00'));
const from = moment(now).subtract(30, 'd');
const to = now;

describe('Inbox Placement Typeahead', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      onChange: jest.fn(),
      getInboxPlacementTrendsFilterValues: jest.fn(),
      trendsFilterValues: results,
      filters: {
        dateRange: {
          from,
          to,
        },
        tags: {},
      },
    };

    return mount(
      <TestApp>
        <InboxPlacementTypeahead {...defaultProps} {...props} />
      </TestApp>,
    );
  };

  it('disabled when error', () => {
    const wrapper = subject({ trendsFilterValuesError: 'Oh no' });
    expect(wrapper.find('Typeahead')).toHaveProp({ disabled: true, error: 'Oh no' });
  });

  it('disabled when loading', () => {
    const wrapper = subject({ trendsFilterValuesloading: true });
    expect(wrapper.find('Typeahead')).toHaveProp('disabled', true);
  });

  it('fetches default filter options on load', () => {
    const getInboxPlacementTrendsFilterValues = jest.fn();
    const wrapper = subject({ getInboxPlacementTrendsFilterValues });
    wrapper.update();
    expect(getInboxPlacementTrendsFilterValues).toBeCalledWith({
      from: '2019-07-11',
      to: '2019-08-10',
    });
  });
});

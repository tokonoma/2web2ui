import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
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

    return mount(<InboxPlacementTypeahead {...defaultProps} {...props} />);
  };

  it('Matches snapshot test with default filters available', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('Fetches default filter options on load', () => {
    const getInboxPlacementTrendsFilterValues = jest.fn();
    const wrapper = subject({ getInboxPlacementTrendsFilterValues });
    wrapper.update();
    expect(getInboxPlacementTrendsFilterValues).toBeCalledWith({
      from: '2019-07-11',
      to: '2019-08-10',
    });
  });
});

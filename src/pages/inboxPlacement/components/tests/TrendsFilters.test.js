import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import TrendsFilters from '../TrendsFilters';

const now = moment.utc(new Date('2019-08-10T12:30:00-04:00'));
const from = moment(now).subtract(30, 'd');
const to = now;

// TODO: Convert this to a mounted test so we can test the
// useEffect that updates the filter range to custom if the
// now is out of date

describe('Inbox Placement Trends Filters', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      updateFilters: jest.fn(),
      validateDate: jest.fn(),
      filters: {
        dateRange: {
          from,
          to,
        },
        tags: {},
      },
    };

    return shallow(<TrendsFilters {...defaultProps} {...props} />);
  };

  it('Matches snapshot test with default filters available', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toHaveTextContent('Filters:');
  });

  it('Displays tags in the filters', () => {
    const filters = {
      dateRange: {
        from,
        to,
      },
      tags: {
        from_domains: 'test.com',
      },
    };
    const wrapper = subject({ filters });
    expect(wrapper).toHaveTextContent('Filters:');
  });
});

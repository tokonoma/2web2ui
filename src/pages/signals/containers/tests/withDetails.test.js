import { shallow } from 'enzyme';
import React from 'react';
import { WithDetails } from '../withDetails';
import * as dateMock from 'src/helpers/date';
import _ from 'lodash';

jest.mock('src/helpers/date');

describe('Signals Details Container', () => {
  let wrapper;
  let props;
  const Component = () => <div>test</div>;

  beforeEach(() => {
    props = {
      component: Component,
      details: {
        data: [{ date: '2015-01-01' }, { date: '2015-01-05' }]
      },
      facet: 'sending_domain',
      facetId: 'test.com',
      filters: {
        from: '2015-01-01',
        to: '2015-01-05'
      },
      fetch: jest.fn(),
      selected: '2015-01-01',
      subaccountId: '101'
    };

    dateMock.getDateTicks.mockImplementation(() => [1,2]);
    wrapper = shallow(<WithDetails {...props} />);
  });

  it('fetches data on mount correctly', () => {
    expect(wrapper).toMatchSnapshot();
    const options = {
      facet: 'sending_domain',
      filter: 'test.com',
      from: '2015-01-01',
      subaccount: '101',
      to: '2015-01-05'
    };
    expect(props.fetch).toHaveBeenCalledWith(options);
  });

  it('fetches data when dates are updated', () => {
    wrapper.setProps({ filters: { relativeRange: 'custom', to: '2016-01-02', from: '2016-01-01' }});
    const options = {
      facet: 'sending_domain',
      filter: 'test.com',
      from: '2016-01-01',
      subaccount: '101',
      to: '2016-01-02'
    };
    expect(props.fetch).toHaveBeenCalledWith(options);
  });

  it('should not fetch when range isnt updated', () => {
    jest.clearAllMocks();
    wrapper.setProps({ another: 'prop' });
    expect(props.fetch).toHaveBeenCalledTimes(0);
  });

  it('should shorten chart gap if data is long', () => {
    wrapper.setProps({ details: { data: _.range(16).map((n) => n) }});
    expect(wrapper.prop('gap')).toEqual(0.2);
  });
});

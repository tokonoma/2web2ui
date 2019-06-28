import { shallow } from 'enzyme';
import React from 'react';
import { FilterFields } from '../FilterFields';

describe('Filter Fields Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      metric: 'health_score',
      disabled: false,
      single_filter: { filter_type: 'none', filter_values: []},
      ipPools: [{ id: 'ip Pool 1' }],
      ipPoolsLoading: false,
      sendingDomains: [{ domain: 'my@domain' }],
      sendingDomainsLoading: false,
      sendingIps: [{ external_ip: '192.168.1.1' }],
      listPools: jest.fn(),
      listSendingDomains: jest.fn(),
      listSendingIps: jest.fn(),
      change: jest.fn()
    };

    wrapper = shallow(<FilterFields {...props} />);
  });

  it('gets filter options when mounted', () => {
    wrapper = shallow(<FilterFields {...props}/>);
    expect(props.listPools).toHaveBeenCalled();
    expect(props.listSendingDomains).toHaveBeenCalled();
    expect(props.listSendingIps).toHaveBeenCalled();
  });

  it('renders single type filter correctly', () => {
    expect(wrapper.find({ name: 'single_filter.filter_values' })).toExist();
    expect(wrapper.find({ name: 'sending_ip' })).not.toExist();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders multi type filter correctly', () => {
    wrapper.setProps({ metric: 'block_bounce_rate' });
    expect(wrapper.find({ name: 'single_filter.filter_values' })).not.toExist();
    expect(wrapper.find({ name: 'sending_ip' })).toExist();
    expect(wrapper).toMatchSnapshot();
  });

  it('reset single filter value when single filter facet changes', () => {
    wrapper.find({ name: 'single_filter.filter_type' }).simulate('change', 'mailbox_provider');
    expect(props.change).toHaveBeenCalled();
  });

});

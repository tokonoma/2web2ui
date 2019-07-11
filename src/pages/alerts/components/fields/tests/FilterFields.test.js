import { shallow } from 'enzyme';
import React from 'react';
import { FilterFields } from '../FilterFields';
import * as alertFormHelper from '../../../helpers/alertForm';

describe('Filter Fields Component', () => {

  const props = {
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

  const subject = (options) => shallow(<FilterFields {...props} {...options} />);

  it('gets filter options when mounted', () => {
    subject();
    expect(props.listPools).toHaveBeenCalled();
    expect(props.listSendingDomains).toHaveBeenCalled();
    expect(props.listSendingIps).toHaveBeenCalled();
  });

  it('renders single type filter', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ filterType: 'single' }));
    const wrapper = subject();
    expect(wrapper.find({ name: 'single_filter.filter_values' })).toExist();
    expect(wrapper.find({ name: 'single_filter.filter_type' })).toExist();
    expect(wrapper.find('Field')).toHaveLength(2);
  });

  it('renders multi type filter', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() =>
      ({ filterType: 'multi' , filterOptions: [{ label: 'My Filter', value: 'myFilter' }]}));
    const wrapper = subject();
    expect(wrapper.find({ name: 'myFilter' })).toExist();
    expect(wrapper.find('Field')).toHaveLength(1);
  });

  it('reset single filter value when single filter facet changes', () => {
    const wrapper = subject();
    wrapper.find({ name: 'single_filter.filter_type' }).simulate('change', 'mailbox_provider');
    expect(props.change).toHaveBeenCalled();
  });

});

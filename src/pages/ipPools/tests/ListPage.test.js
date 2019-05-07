import { shallow } from 'enzyme';
import React from 'react';

import { IpPoolsList, getRowData, IPWarmupReminderBanner } from '../ListPage';
import SupportTicketLink from 'src/components/supportTicketLink/SupportTicketLink';

describe('IP Pools List Page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      loading: false,
      ipPools: [
        { name: 'Test Pool 1', id: 101, ips: [{ external_ip: 1111 }, { external_ip: 2222 }]},
        { name: 'Test Pool 2', id: 102, ips: []}
      ],
      listPools: jest.fn(() => []),
      showPurchaseCTA: true,
      isManuallyBilled: false,
      isAdmin: true
    };

    wrapper = shallow(<IpPoolsList {...props} />);
  });

  it('should render the list page correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show alert upon error', () => {
    wrapper.setProps({ ipPools: [], error: { message: 'Uh oh! It broke.' }});
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading component when loading data', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render row properly', () => {
    const rows = getRowData({
      id: 'my-pool',
      name: 'My Pool',
      ips: [1,2,3]
    });

    expect(rows).toMatchSnapshot();
  });

  it('does not render purchase action if showPurchaseCTA is false', () => {
    wrapper.setProps({ ipPools: [{ name: 'Default', ips: []}], showPurchaseCTA: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render purchase action if showPurchaseCTA is false2', () => {
    wrapper.setProps({ ipPools: [{ name: 'Default', ips: []}], showPurchaseCTA: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders request IP action if showPurchaseCTA is true and isManuallyBilled is true', () => {
    wrapper.setProps({ isManuallyBilled: true });
    expect(wrapper.prop('secondaryActions')).toEqual([{ content: 'Request IPs', Component: SupportTicketLink, issueId: 'request_new_ip' } ]);
  });

  it('does not render purchase action if isAdmin is false', () => {
    wrapper.setProps({ ipPools: [{ name: 'Default', ips: []}], isAdmin: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the IP warm-up banner correctly', () => {
    expect(shallow(<IPWarmupReminderBanner />)).toMatchSnapshot();
  });

});

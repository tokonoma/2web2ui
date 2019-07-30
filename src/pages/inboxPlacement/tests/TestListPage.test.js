import { shallow } from 'enzyme';
import React from 'react';
import { TestListPage } from '../TestListPage';

describe('Page: Seedlist Tests List', () => {
  const props = {
    listTests: jest.fn(),
    error: null,
    tests: [{
      id: 1,
      campaignHeader: 'campaignHeader_test1',
      subject: 'subject_test1',
      fromAddress: 'local@fromAddress_test1',
      createdAt: 'createdAt_test1',
      stoppedAt: 'stoppedAt_test1',
      status: 'status_test1',
      seedlistSize: 11,
      inboxRate: 0.1,
      spamRate: 0.1,
      missingRate: 0.1,
      spfRate: 0.1,
      dkimRate: 0.1,
      dmarcRate: 0.1
    },
    {
      id: 2,
      campaignHeader: 'campaignHeader_test2',
      subject: 'subject_test2',
      fromAddress: 'local@fromAddress_test2',
      createdAt: 'createdAt_test2',
      stoppedAt: 'stoppedAt_test2',
      status: 'status_test2',
      seedlistSize: 12,
      inboxRate: 0.2,
      spamRate: 0.2,
      missingRate: 0.2,
      spfRate: 0.2,
      dkimRate: 0.2,
      dmarcRate: 0.2
    },
    {
      id: 3,
      campaignHeader: 'campaignHeader_test3',
      subject: 'subject_test3',
      fromAddress: 'local@fromAddress_test3',
      createdAt: 'createdAt_test3',
      stoppedAt: 'stoppedAt_test3',
      status: 'status_test3',
      seedlistSize: 13,
      inboxRate: 0.3,
      spamRate: 0.3,
      missingRate: 0.3,
      spfRate: 0.3,
      dkimRate: 0.3,
      dmarcRate: 0.3
    }],
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TestListPage {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading component when loading data', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should render error when list fails to load', () => {
    wrapper.setProps({ error: { message: 'this failed' }});
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });
});

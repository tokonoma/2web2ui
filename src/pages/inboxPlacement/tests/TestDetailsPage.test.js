import { shallow, mount } from 'enzyme';
import React from 'react';

import { TestDetailsPage } from '../TestDetailsPage';

describe('Page: Single Inbox Placement Test', () => {
  let wrapper;

  const mockGetTest = jest.fn();
  const mockHistoryReplace = jest.fn();

  const props = {
    getInboxPlacementTest: mockGetTest,
    tabIndex: 0,
    id: 0,
    loading: false,
    error: false,
    history: {
      replace: mockHistoryReplace
    }
  };


  beforeEach(() => {
    wrapper = shallow(<TestDetailsPage {...props} />);
  });

  it('renders page correctly with defaults', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls getInboxPlacementTest on load', () => {
    wrapper = mount(<TestDetailsPage {...props} />);
    expect(mockGetTest).toHaveBeenCalled();
  });

  it('renders loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders details when tab is set to details', () => {
    expect(wrapper.find('TestDetails')).toExist();
    expect(wrapper.find('TestContent')).not.toExist();
  });

  it('renders content when tab is set to details', () => {
    wrapper.setProps({ tabIndex: 1 });
    expect(wrapper.find('TestContent')).toExist();
    expect(wrapper.find('TestDetails')).not.toExist();
  });

  it('updates URl when tabs change', () => {
    wrapper = mount(<TestDetailsPage {...props} />);
    (wrapper.find('Tab').last().simulate('click'));
    expect(mockHistoryReplace).toHaveBeenCalled();
  });
});


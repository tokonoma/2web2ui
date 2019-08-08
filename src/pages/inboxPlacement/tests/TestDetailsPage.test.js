import { shallow, mount } from 'enzyme';
import React from 'react';

import { TestDetailsPage } from '../TestDetailsPage';

describe('Page: Single Inbox Placement Test', () => {
  let wrapper;
  let props;
  const mockGetTest = jest.fn();

  const mockHistoryReplace = jest.fn();
  beforeEach(() => {
    props = {
      getInboxPlacementTest: mockGetTest,
      getInboxPlacementByProviders: jest.fn(),
      tabIndex: 0,
      id: 0,
      loading: false,
      error: false,
      history: {
        replace: mockHistoryReplace
      }
    };

    wrapper = shallow(<TestDetailsPage {...props} />);
  });

  it('renders page correctly with defaults', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls getInboxPlacementTest on load', () => {
    wrapper = mount(<TestDetailsPage {...props} />);
    expect(wrapper).toHaveBeenCalled();
  });

  it('renders loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
    expect(wrapper.find('Page')).not.toExist();
  });

  it('handles errors', () => {
    wrapper.setProps({
      error: {
        message: 'You dun goofed'
      }
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('RedirectAndAlert')).toExist();
    expect(wrapper.find('Page')).not.toExist();
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

  it('updates URL when tabs change', () => {
    wrapper = mount(<TestDetailsPage {...props} />);
    (wrapper.find('Tab').last().simulate('click'));
    expect(mockHistoryReplace).toHaveBeenCalled();
  });
});


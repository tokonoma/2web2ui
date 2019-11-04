import { mount, shallow } from 'enzyme';
import React from 'react';
import { TestDetailsPage } from '../TestDetailsPage';
import { StopTest } from '../components/StopTest';


describe('Page: Single Inbox Placement Test', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      getInboxPlacementTest: jest.fn(),
      getInboxPlacementByProviders: jest.fn(),
      getInboxPlacementTestContent: jest.fn(),
      tabIndex: 0,
      id: 0,
      loading: false,
      error: false,
      history: {
        replace: jest.fn()
      }
    };

    return shallow(<TestDetailsPage {...defaults} {...props} />);
  };

  it('renders page correctly with defaults', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getInboxPlacementTest on load', () => {
    const getInboxPlacementTest = jest.fn().mockReturnValue({});
    const getInboxPlacementByProviders = jest.fn().mockReturnValue({});
    const getInboxPlacementByRegion = jest.fn().mockReturnValue({});
    const getInboxPlacementTestContent = jest.fn().mockReturnValue({});

    mount(<TestDetailsPage
      details={{}}
      content={{}}
      getInboxPlacementTest={getInboxPlacementTest}
      getInboxPlacementByProviders={getInboxPlacementByProviders}
      getInboxPlacementByRegion={getInboxPlacementByRegion}
      getInboxPlacementTestContent={getInboxPlacementTestContent}
      id={101}
      tabIndex={1} //not working nicely with tabIndex=0; TestDetails component
      history={{ replace: jest.fn() }}
      StopTestComponent={StopTest}/>);

    expect(getInboxPlacementTest).toHaveBeenCalled();
    expect(getInboxPlacementByProviders).toHaveBeenCalled();
    expect(getInboxPlacementTestContent).toHaveBeenCalled();
  });

  it('renders loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
    expect(wrapper.find('Page')).not.toExist();
  });

  it('handles errors', () => {
    const wrapper = subject();
    wrapper.setProps({
      error: {
        message: 'You dun goofed'
      }
    });
    expect(wrapper.find('RedirectAndAlert')).toMatchSnapshot();
    expect(wrapper.find('Page')).not.toExist();
  });

  it('renders details when tab is set to details', () => {
    const wrapper = subject();
    expect(wrapper.find('TestDetails')).toExist();
    expect(wrapper.find('TestContent')).not.toExist();
  });

  it('renders content when tab is set to content', () => {
    const wrapper = subject();
    wrapper.setProps({ tabIndex: 1 });
    expect(wrapper.find('TestContent')).toExist();
    expect(wrapper.find('TestDetails')).not.toExist();
  });

  it('updates URL when tabs change', () => {
    const mockHistory = { replace: jest.fn() };
    const wrapper = mount(<TestDetailsPage tabIndex={1}
      details={{}}
      content={{}}
      history={mockHistory}
      getInboxPlacementTest={jest.fn()}
      getInboxPlacementByProviders={jest.fn()}
      getInboxPlacementByRegion={jest.fn()}
      getInboxPlacementTestContent={jest.fn()}
      StopTestComponent={StopTest}
    />);
    wrapper.find('Tab').last().simulate('click');
    expect(mockHistory.replace).toHaveBeenCalled();
  });
});


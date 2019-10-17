import { mount, shallow } from 'enzyme';
import React from 'react';
import { AllMessagesPage } from '../AllMessagesPage';
import { StopTest } from '../components/StopTest';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Page: All Inbox Placement Messages Test', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      getAllInboxPlacementMessages: jest.fn(),
      getInboxPlacementByProviders: jest.fn(),
      id: 0,
      loading: false,
      sent: 100,
      placement: {
        inbox_pct: 1,
        missing_pct: 0,
        spam_pct: 0
      },
      authentication: {
        spf_pct: 1,
        dkim_pct: 1,
        dmarc_pct: 1
      },
      error: false,
      history: {
        replace: jest.fn()
      }
    };

    return shallow(<AllMessagesPage {...defaults} {...props} />);
  };

  it('renders page correctly with defaults', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getInboxPlacementTest on load', () => {
    const getAllInboxPlacementMessages = jest.fn().mockReturnValue({});
    const getInboxPlacementByProviders = jest.fn().mockReturnValue({});

    mount(
      <Router>
        <AllMessagesPage
          filterType={'mailbox-provider'}
          filterName={'gmail.com'}
          status={'completed'}
          messages={[]}
          sent={100}
          placement={{}}
          authentication={{}}
          getAllInboxPlacementMessages={getAllInboxPlacementMessages}
          getInboxPlacementByProviders={getInboxPlacementByProviders}
          id={101}
          history={{ replace: jest.fn() }}
          StopTestComponent={StopTest}/>
      </Router>);

    expect(getAllInboxPlacementMessages).toHaveBeenCalled();
    expect(getInboxPlacementByProviders).toHaveBeenCalled();
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
});


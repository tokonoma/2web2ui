import { mount, shallow } from 'enzyme';
import React from 'react';
import { AllMessagesPage } from '../AllMessagesPage';
import { StopTest } from '../components/StopTest';
import { AllMessagesCollection } from '../components/AllMessagesCollection';
import { BrowserRouter as Router } from 'react-router-dom';
import { PLACEMENT_FILTER_TYPES } from '../constants/types';



describe('Page: All Inbox Placement Messages Test', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      filterType: PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER,
      filterName: 'gmail',
      getAllInboxPlacementMessages: jest.fn(),
      getInboxPlacementByProviders: jest.fn(),
      getInboxPlacementByRegions: jest.fn(),
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
      },
      messages: []
    };

    return shallow(<AllMessagesPage {...defaults} {...props} />);
  };

  it('renders page correctly with defaults', () => {
    expect(subject()).toMatchSnapshot();
  });

  describe('useEffect hook', () => {

    const getAllInboxPlacementMessages = jest.fn().mockReturnValue({});
    const getInboxPlacementByProviders = jest.fn().mockReturnValue({});
    const getInboxPlacementByRegions = jest.fn().mockReturnValue({});
    const resetState = jest.fn().mockReturnValue({});
    const subjectMounted = ({ ...props }) => mount(
      <Router>
        <AllMessagesPage
          filterType={PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER}
          filterName={'gmail.com'}
          status={'completed'}
          messages={[]}
          sent={100}
          placement={{}}
          authentication={{}}
          getAllInboxPlacementMessages={getAllInboxPlacementMessages}
          getInboxPlacementByProviders={getInboxPlacementByProviders}
          getInboxPlacementByRegions={getInboxPlacementByRegions}
          resetState={resetState}
          id={101}
          history={{ replace: jest.fn() }}
          error={null}
          StopTestComponent={StopTest}
          AllMessagesCollectionComponent={AllMessagesCollection}
          {...props}/>
      </Router>);

    it('calls getInboxPlacementTest & getInboxPlacementByProviders on load for mailbox-providers', () => {
      subjectMounted();
      expect(getAllInboxPlacementMessages).toHaveBeenCalledWith(101, { mailbox_providers: 'gmail.com' });
      expect(getInboxPlacementByProviders).toHaveBeenCalled();
    });

    it('calls getInboxPlacementTest & getInboxPlacementByRegions on load for mailbox-providers', () => {
      subjectMounted({ filterType: PLACEMENT_FILTER_TYPES.REGION, filterName: 'europe' });
      expect(getAllInboxPlacementMessages).toHaveBeenCalledWith(101, { regions: 'europe' });
      expect(getInboxPlacementByRegions).toHaveBeenCalled();
    });

    it('calls resetState on unmount', () => {
      const wrapper = subjectMounted();
      wrapper.unmount();
      expect(resetState).toHaveBeenCalled();
    });
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

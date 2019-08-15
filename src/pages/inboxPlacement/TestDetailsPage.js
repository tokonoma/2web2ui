import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Page, Tabs } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent } from 'src/actions/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import TestDetails from './components/TestDetails';
import TestContent from './components/TestContent';
import useTabs from 'src/hooks/useTabs';
import { RedirectAndAlert } from 'src/components/globalAlert';

export const TestDetailsPage = (props) => {
  const {
    history,
    id,
    tabIndex,
    loading,
    details,
    placementsByProvider,
    content,
    error,
    getInboxPlacementTest,
    getInboxPlacementByProviders,
    getInboxPlacementTestContent
  } = props;

  const [selectedTabIndex, tabs] = useTabs(TABS, tabIndex);

  useEffect(() => {
    getInboxPlacementTest(id);
    getInboxPlacementByProviders(id);
    getInboxPlacementTestContent(id);
  }, [getInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent, id]);

  useEffect(() => {
    history.replace(`/inbox-placement/details/${id}/${TABS[selectedTabIndex].key}`);
  }, [history, id, selectedTabIndex]);


  const renderTabContent = () => {
    const selectedTabKey = tabs[selectedTabIndex].key;
    switch (selectedTabKey) {
      case 'content':
        return <TestContent content={content} details={details}/>;
      default:
        return <TestDetails details={details} placementsByProvider={placementsByProvider}/>;
    }
  };

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <RedirectAndAlert
      to='/inbox-placement'
      alert={{ type: 'error', message: error.message }}/>;
  }

  return (
    <Page title='Inbox Placement | Results'>
      <Tabs
        selected={selectedTabIndex}
        connectBelow={true}
        tabs={tabs}
      />
      {renderTabContent(selectedTabIndex)}
    </Page>
  );
};

const TABS = [
  { content: 'Details', key: 'details' },
  { content: 'Content', key: 'content' }
];

function mapStateToProps(state, props) {
  const id = props.match.params.id;
  const currentTabIndex = TABS.findIndex(({ key }) => key === props.match.params.tab);

  return {
    tabIndex: currentTabIndex > 0 ? currentTabIndex : 0,
    id,
    loading: state.inboxPlacement.getTestPending || state.inboxPlacement.getByProviderPending || state.inboxPlacement.getTestContentPending,
    error: state.inboxPlacement.getTestError || state.inboxPlacement.getByProviderError || state.inboxPlacement.getTestContentError,
    details: state.inboxPlacement.currentTestDetails || {},
    placementsByProvider: state.inboxPlacement.placementsByProvider || [],
    content: state.inboxPlacement.currentTestContent || {}
  };
}

export default connect(mapStateToProps, { getInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent, showAlert })(TestDetailsPage);

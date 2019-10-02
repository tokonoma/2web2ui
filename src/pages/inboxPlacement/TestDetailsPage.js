import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Page, Tabs } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementTest, stopInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent } from 'src/actions/inboxPlacement';
import TestDetails from './components/TestDetails';
import TestContent from './components/TestContent';
import useTabs from 'src/hooks/useTabs';
import { RedirectAndAlert } from 'src/components/globalAlert';
import StopTest from './components/StopTest';

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
    getInboxPlacementTestContent,
    stopTestLoading,
    stopInboxPlacementTest
  } = props;

  const [selectedTabIndex, tabs] = useTabs(TABS, tabIndex);

  const loadTestData = useCallback(() => {
    getInboxPlacementTest(id);
    getInboxPlacementByProviders(id);
    getInboxPlacementTestContent(id);
  }, [getInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent, id]);

  const stopTest = useCallback(() => {
    stopInboxPlacementTest(id).then(loadTestData);
  }, [id, loadTestData, stopInboxPlacementTest]);

  useEffect(() => {
    loadTestData();
  }, [getInboxPlacementTest, id, loadTestData]);

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
    <Page
      breadcrumbAction={{
        content: 'All Inbox Placement Tests',
        onClick: () => history.push('/inbox-placement')
      }}
      title='Inbox Placement'
      subtitle='Results'
      primaryArea={<StopTest status={(details || {}).status} loading={stopTestLoading} onStop={stopTest} />}
    >
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
    stopTestLoading: state.inboxPlacement.stopTestPending,
    error: state.inboxPlacement.getTestError || state.inboxPlacement.getByProviderError || state.inboxPlacement.getTestContentError,
    details: state.inboxPlacement.currentTestDetails,
    placementsByProvider: state.inboxPlacement.placementsByProvider || [],
    content: state.inboxPlacement.currentTestContent || {}
  };
}

export default connect(mapStateToProps, { getInboxPlacementTest, getInboxPlacementByProviders, getInboxPlacementTestContent, stopInboxPlacementTest })(TestDetailsPage);

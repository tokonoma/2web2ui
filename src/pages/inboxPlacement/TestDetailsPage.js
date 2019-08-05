import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Page, Panel, Tabs } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementTest } from 'src/actions/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import styles from './TestDetailsPage.module.scss';
import TestDetails from './components/TestDetails';
import TestContent from './components/TestContent';
import useTabs from 'src/hooks/useTabs';

export const TestDetailsPage = (props) => {
  const { history, id, tabIndex, loading, getInboxPlacementTest } = props;
  const [selectedTabIndex, tabs] = useTabs(TABS, tabIndex);

  useEffect(() => {
    getInboxPlacementTest(id);
  }, [getInboxPlacementTest, id]);

  useEffect(() => {
    history.replace(`/inbox-placement/details/${id}/${TABS[selectedTabIndex].key}`);
  }, [history, id, selectedTabIndex]);


  const renderTabContent = () => {
    const selectedTabKey = tabs[selectedTabIndex].key;
    switch (selectedTabKey) {
      case 'content':
        return <TestContent/>;
      default:
        return <TestDetails/>;
    }
  };

  const renderTabs = () => (<>
    <Tabs
      selected={selectedTabIndex}
      connectBelow={true}
      tabs={tabs}
    />
    <Panel className={styles.TabPadding}>
      {renderTabContent(selectedTabIndex)}
    </Panel>
  </>);

  if (loading) {
    return <Loading/>;
  }

  return (
    <Page title='Inbox Placement | Results'>
      {renderTabs()}
    </Page>
  );
};

const TABS = [
  { content: <span className={styles.TabPadding}>Details</span>, key: 'details' },
  { content: <span className={styles.TabPadding}>Content</span>, key: 'content' }
];

function mapStateToProps(state, props) {
  const id = props.match.params.id;
  const currentTabIndex = TABS.findIndex(({ key }) => key === props.match.params.tab);

  return {
    tabIndex: currentTabIndex > 0 ? currentTabIndex : 0,
    id,
    loading: state.inboxPlacement.listLoading,
    error: state.inboxPlacement.listError
  };
}

export default connect(mapStateToProps, { getInboxPlacementTest, showAlert })(TestDetailsPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, Panel, Tabs } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementTest } from 'src/actions/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import styles from './TestDetailsPage.module.scss';
import TestDetails from './components/TestDetails';
import TestContent from './components/TestContent';

export class TestDetailsPage extends Component {
  state = {
    selectedTab: this.props.tab || 0
  };

  handleTabs(tabIdx) {
    const { history } = this.props;
    const { id } = this.props;

    history.replace(`/inbox-placement/details/${id}/${tabs[tabIdx].key}`);
    this.setState({ selectedTab: tabIdx });
  }

  componentDidMount() {
    const { id, getInboxPlacementTest } = this.props;
    getInboxPlacementTest(id);
  }

  renderTabContent = (tabId) => {
    switch (tabId) {
      case 1:
        return <TestContent/>;
      default:
        return <TestDetails/>;
    }
  };

  renderTabs = () => {
    const { selectedTab } = this.state;

    return (<>
      <Tabs
        selected={selectedTab}
        connectBelow={true}
        tabs={tabs.map(({ content }, idx) => ({ content, onClick: () => this.handleTabs(idx) }))}
      />
      <Panel className={styles.TabPadding}>

        {this.renderTabContent(selectedTab)}
      </Panel>
    </>);
  };

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading/>;
    }

    return (
      <Page title='Inbox Placement | Results'>
        {this.renderTabs()}
      </Page>
    );
  }
}

const tabs = [
  { content: <span className={styles.TabPadding}>Details</span>, key: 'details' },
  { content: 'Content', key: 'content' }
];


function mapStateToProps(state, props) {
  const id = props.match.params.id;
  const currentTabIndex = tabs.findIndex(({ key }) => key === props.match.params.tab);

  return {
    tab: currentTabIndex > 0 ? currentTabIndex : 0,
    id,
    loading: state.inboxPlacement.listLoading,
    error: state.inboxPlacement.listError
  };
}

export default connect(mapStateToProps, { getInboxPlacementTest, showAlert })(TestDetailsPage);

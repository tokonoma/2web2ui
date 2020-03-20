import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { Panel, Tabs } from 'src/components/matchbox';
import styles from './DataPrivacyPage.module.scss';
import ApiDetailsTab from './components/ApiDetailsTab';
import SingleRecipientTab from './components/SingleRecipientTab';
const tabs = [
  { content: 'Single Recipient', key: 'single-recipient' },
  { content: 'Multiple Recipients', key: 'multiple-recipients' },
  { content: 'API Integration', key: 'api' },
];
export const DataPrivacyPage = props => {
  const [tabIndex, setTabIndex] = useState(
    tabs.findIndex(x => x.key === props.match.params.category) || 0,
  );
  useEffect(() => {
    props.history.replace(`/account/data-privacy/${tabs[tabIndex].key}`);
  }, [props.history, tabIndex]);

  const handleTabs = tabIdx => {
    setTabIndex(tabIdx);
  };

  const renderTabs = tabIdx => {
    switch (tabIdx) {
      case 0:
        return <SingleRecipientTab />;
      case 2:
        return <ApiDetailsTab history={props.history} />;

      default:
        return <Panel.Section></Panel.Section>;
    }
  };

  return (
    <Page title="Data and Privacy">
      <p className={styles.LeadText}>
        Fill in this form to request deletion of recipient data or opt-out of third party data usage
        of recipient's personal information. Your request will be completed within 30 days.
      </p>
      <Tabs
        selected={tabIndex}
        connectBelow={true}
        tabs={tabs.map(({ content }, idx) => ({
          content,
          onClick: () => handleTabs(idx),
        }))}
      />

      <Panel>{renderTabs(tabIndex)}</Panel>
    </Page>
  );
};

export default withRouter(DataPrivacyPage);

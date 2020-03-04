import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Page, Tabs, Panel, Button } from '@sparkpost/matchbox';
import { Launch } from '@sparkpost/matchbox-icons';
import styles from './DataPrivacyPage.module.scss';
const tabs = [
  { content: 'Single Recipient', key: 'single-recipient' },
  { content: 'Multiple Recipients', key: 'multiple-recipients' },
  { content: 'API Integration', key: 'api' },
];
const DataPrivacy = props => {
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
      case 2:
        return (
          <Panel.Section>
            <div className={styles.Header}>Integrate Now</div>
            <p>
              {'Information on how to use this API key. '}
              <a
                href="https://developers.sparkpost.com/api/data-privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                {'Link to documentation'}
                <Launch className={styles.LaunchIcon} />
              </a>
            </p>
            <Button color="orange" onClick={() => props.history.push(`/account/api-keys/create`)}>
              {'Generate key'}
            </Button>
          </Panel.Section>
        );

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

export default withRouter(DataPrivacy);

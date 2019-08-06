import React from 'react';
import { Panel, CodeBlock, Tabs, Grid } from '@sparkpost/matchbox';
import useTabs from 'src/hooks/useTabs';
import styles from './TestContent.module.scss';

import { formatBytes } from 'src/helpers/units';

const TABS = [
  { content: 'Raw Message', key: 'raw_message' },
  { content: 'HTML', key: 'html' },
  { content: 'AMP HTML', key: 'amp' },
  { content: 'Text', key: 'text' },
  { content: 'Headers', key: 'headers' }
];

const TestContent = ({ content, details }) => {
  const [selectedTabIndex, tabs] = useTabs(TABS);
  const selectedTabKey = tabs[selectedTabIndex].key;
  const { from_address, message_size } = details;

  return (
    <>
    <Panel title={details.subject} sectioned>
      <Grid>
        <Grid.Column sm={12} md={3}>
          From:
          <br/>
          <span className={styles.FromAddress}>{from_address}</span>
        </Grid.Column>
        <Grid.Column xs={12} md={3}>
          Raw Message Size:
          <br/>
          {formatBytes(message_size)}
        </Grid.Column>
      </Grid>
    </Panel>
      <Panel>
        <Tabs selected={selectedTabIndex} tabs={tabs} />
        <Panel.Section>
          <CodeBlock code={content[selectedTabKey] || ''}/>
        </Panel.Section>
      </Panel>
      </>
  );
};

export default TestContent;




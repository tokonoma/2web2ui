import React from 'react';
import { Panel, CodeBlock, Tabs, Grid } from '@sparkpost/matchbox';
import useTabs from 'src/hooks/useTabs';
import { formatBytes } from 'src/helpers/units';
import InfoBlock from './InfoBlock';

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
    <Panel sectioned>
      <h2>{details.subject}</h2>
      <Grid>
        <InfoBlock value={from_address} label='From' columnProps={{ sm: 12, md: 4 }}/>
        <InfoBlock value={formatBytes(message_size)} label='Raw Message Size' columnProps={{ sm: 12, md: 4 }}/>
      </Grid>
    </Panel>
    <Panel>
      <Tabs selected={selectedTabIndex} tabs={tabs} color='blue' />
      <Panel.Section>
        <CodeBlock code={content[selectedTabKey] || ''}/>
      </Panel.Section>
    </Panel>
    </>
  );
};

export default TestContent;




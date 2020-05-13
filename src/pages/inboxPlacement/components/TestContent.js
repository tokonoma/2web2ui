import React from 'react';
import { CodeBlock, Grid, Panel, Tabs } from 'src/components/matchbox';
import { Bold } from 'src/components/text';
import { formatBytes } from 'src/helpers/units';
import useTabs from 'src/hooks/useTabs';

const TABS = [
  { content: 'Raw Message', key: 'raw_message' },
  { content: 'HTML', key: 'html' },
  { content: 'AMP HTML', key: 'amp' },
  { content: 'Text', key: 'text' },
  { content: 'Headers', key: 'headers' },
];

const TestContent = ({ content, details }) => {
  const [selectedTabIndex, tabs] = useTabs(TABS);
  const selectedTabKey = tabs[selectedTabIndex].key;

  return (
    <>
      <Panel>
        <Panel.Section>
          <Grid>
            <Grid.Column xs={12} sm={6} md={6}>
              <Bold>Subject Line</Bold>
              <div>{details.subject}</div>
            </Grid.Column>
            <Grid.Column xs={12} sm={6} md={6}>
              <Bold>From</Bold>
              <div>{details.from_address}</div>
            </Grid.Column>
          </Grid>
        </Panel.Section>
        <Panel.Section>
          <Bold>Raw Message Size</Bold>
          <div>{formatBytes(details.message_size)}</div>
        </Panel.Section>
      </Panel>
      <Panel>
        <Tabs selected={selectedTabIndex} tabs={tabs} color="blue" />
        <Panel.Section>
          <CodeBlock code={content[selectedTabKey] || ''} />
        </Panel.Section>
      </Panel>
    </>
  );
};

export default TestContent;

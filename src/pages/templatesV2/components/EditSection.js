import React, { useState } from 'react';
import {
  Panel,
  Tabs,
  Button,
  Popover,
  ActionList,
  ScreenReaderOnly
} from '@sparkpost/matchbox';
import { MoreVert } from '@sparkpost/matchbox-icons';
import tabs from '../constants/editTabs';
import InsertSnippetModal from './InsertSnippetModal';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditSection.module.scss';

const EditSection = () => {
  const { currentTabIndex, setTab } = useEditorContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isSnippetModalOpen, setSnippetModalOpen] = useState(false);
  const TabComponent = tabs[currentTabIndex].render;

  const handleInsertSnippetClick = () => {
    setPopoverOpen(false);
    setSnippetModalOpen(true);
  };

  return (
    <Panel className={styles.EditSection}>
      <div className={styles.TabsWrapper}>
        {/* eslint-disable no-unused-vars */}
        <Tabs
          color="blue"
          selected={currentTabIndex}
          onSelect={(nextTabIndex) => { setTab(nextTabIndex); }}
          tabs={tabs.map(({ render, ...tab }) => tab)}
        />
        {/* eslint-enable no-unused-vars */}

        <Popover
          left
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          trigger={
            <Button
              flat
              className={styles.MoreButton}
              onClick={() => setPopoverOpen(!isPopoverOpen)}
              data-id="popover-trigger-more"
            >
              <MoreVert/>

              <ScreenReaderOnly>More</ScreenReaderOnly>
            </Button>
          }
        >
          <ActionList
            actions={
              [
                {
                  content: 'Insert Snippet',
                  onClick: () => handleInsertSnippetClick(),
                  role: 'button',
                  href: 'javascript:void(0);',
                  'data-id': 'popover-action-insert-snippet'
                }
              ]
            }
          />
        </Popover>
      </div>

      <TabComponent />

      <InsertSnippetModal
        open={isSnippetModalOpen}
        onClose={() => setSnippetModalOpen(false)}
        loading={false}
      />
    </Panel>
  );
};

export default EditSection;

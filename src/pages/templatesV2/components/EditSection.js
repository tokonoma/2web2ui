import React, { useState } from 'react';
import {
  Panel,
  Tabs,
  Button,
  Popover,
  ActionList,
  ScreenReaderOnly,
  Tag
} from '@sparkpost/matchbox';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import tabs from '../constants/editTabs';
import InsertSnippetModal from './InsertSnippetModal';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditSection.module.scss';

const EditSection = () => {
  const {
    currentTabIndex,
    currentTabKey,
    setTab,
    setContent,
    content,
    isPublishedMode
  } = useEditorContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isSnippetModalOpen, setSnippetModalOpen] = useState(false);
  const [isAMPModalOpen, setAMPModalOpen] = useState(false);

  const currentTab = tabs[currentTabIndex];
  const TabComponent = currentTab.render;
  const hasReadOnlyTag = isPublishedMode && (currentTab.key === 'html' || currentTab.key === 'amp_html' || currentTab.key === 'text');
  const hasPopover = !isPublishedMode;
  const AMPBoilerplate = `
<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
  `.trim(); // Tabbing is weird here to ensure no extra tabs are rendered in the editor
  const popoverActions = [
    {
      content: 'Insert Snippet',
      onClick: () => handleInsertSnippetClick(),
      role: 'button',
      href: 'javascript:void(0);',
      title: 'Opens a dialog',
      'data-id': 'popover-action-insert-snippet'
    },
    currentTabKey === 'amp_html' && {
      content: 'Insert AMP Boilerplate',
      onClick: () => handleInsertAMPClick(),
      role: 'button',
      href: 'javascript:void(0);',
      title: 'Opens a dialog',
      'data-id': 'popover-action-insert-amp-boilerplate'
    }
  ].filter(Boolean); // Removes empty items from the array

  const handleInsertSnippetClick = () => {
    setPopoverOpen(false);
    setSnippetModalOpen(true);
  };

  const handleInsertAMPClick = () => {
    setPopoverOpen(false);
    setAMPModalOpen(true);
  };

  const handleAMPConfirmClick = () => {
    setAMPModalOpen(false);
    setContent({
      ...content,
      amp_html: AMPBoilerplate
    });
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

        {hasReadOnlyTag &&
          <div className={styles.TagWrapper}>
            <Tag color="yellow">
              <span>Read Only</span>
            </Tag>
          </div>
        }

        {hasPopover &&
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
                <MoreHoriz/>

                <ScreenReaderOnly>More</ScreenReaderOnly>
              </Button>
            }
          >
            <ActionList actions={popoverActions}/>
          </Popover>
        }
      </div>

      <TabComponent />

      <InsertSnippetModal
        open={isSnippetModalOpen}
        onClose={() => setSnippetModalOpen(false)}
        loading={false}
      />

      <ConfirmationModal
        open={isAMPModalOpen}
        title='Are you sure you want to insert the AMP Email Boilerplate?'
        content={<p>Any existing markup in the AMP tab will be lost.</p>}
        confirmVerb='Insert'
        onCancel={() => setAMPModalOpen(false)}
        onConfirm={handleAMPConfirmClick}
      />
    </Panel>
  );
};

export default EditSection;

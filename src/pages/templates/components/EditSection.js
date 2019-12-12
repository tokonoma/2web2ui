import React, { useState } from 'react';
import {
  Panel,
  Tabs,
  Button,
  Popover,
  ActionList,
  ScreenReaderOnly,
  Tag,
} from '@sparkpost/matchbox';
import { MoreHoriz, ArrowDropDown } from '@sparkpost/matchbox-icons';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import tabs from '../constants/editTabs';
import InsertSnippetModal from './InsertSnippetModal';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditSection.module.scss';
import { DraggableModal } from '../../../components/draggableModal/DraggableModal';
// import CheckboxnRadioForm from '../../../components/ampEmailComponentForms/CheckboxnRadioForm';
import ImageForm from '../../../components/ampEmailComponentForms/ImageForm';
import FormContainer from '../../../components/ampEmailComponentForms/FormContainer';
import TimeagoForm from 'src/components/ampEmailComponentForms/TimeagoForm';
import AccordionForm from 'src/components/ampEmailComponentForms/AccordionForm';

const EditSection = () => {
  const {
    currentTabIndex,
    currentTabKey,
    setTab,
    setContent,
    content,
    isPublishedMode,
  } = useEditorContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isPopoverOpen2, setPopoverOpen2] = useState(false);
  const [isSnippetModalOpen, setSnippetModalOpen] = useState(false);
  const [isAMPModalOpen, setAMPModalOpen] = useState(false);
  const [accordianModal, setAccordianModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [timeAgoModal, setTimeAgoModal] = useState(false);
  const [formContainerModal, setFormContainerModal] = useState(false);
  // const [checkorRadioModal, setCheckorRadioModal] = useState(false);
  const currentTab = tabs[currentTabIndex];
  const TabComponent = currentTab.render;
  const hasReadOnlyTag =
    isPublishedMode &&
    (currentTab.key === 'html' || currentTab.key === 'amp_html' || currentTab.key === 'text');
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
    <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    <script async custom-element="amp-timeago" src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"></script>
    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
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
      'data-id': 'popover-action-insert-snippet',
    },
    currentTabKey === 'amp_html' && {
      content: 'Insert AMP Boilerplate',
      onClick: () => handleInsertAMPClick(),
      role: 'button',
      href: 'javascript:void(0);',
      title: 'Opens a dialog',
      'data-id': 'popover-action-insert-amp-boilerplate',
    },
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
      amp_html: AMPBoilerplate,
    });
  };

  return (
    <Panel className={styles.EditSection}>
      <div className={styles.TabsWrapper}>
        {/* eslint-disable no-unused-vars */}
        <Tabs
          color="blue"
          selected={currentTabIndex}
          onSelect={nextTabIndex => {
            setTab(nextTabIndex);
          }}
          tabs={tabs.map(({ render, ...tab }) => tab)}
        />
        {/* eslint-enable no-unused-vars */}
        {currentTabIndex === 1 && (
          <>
            <div>
              <Popover
                left
                open={isPopoverOpen2}
                onClose={() => setPopoverOpen2(false)}
                trigger={
                  <Button
                    flat
                    className={styles.MoreButton}
                    onClick={() => setPopoverOpen2(true)}
                    data-id="popover-trigger-more"
                  >
                    AMP Components <ArrowDropDown />
                  </Button>
                }
              >
                <ActionList
                  actions={[
                    {
                      content: 'Accordion',
                      onClick: () => {
                        setAccordianModal(true);
                      },
                    },
                    {
                      content: 'Image',
                      onClick: () => {
                        setImageModal(true);
                      },
                    },
                    // {
                    //   content: 'Checkbox/Radio Buttons',
                    //   onClick: () => {
                    //     setCheckorRadioModal(true);
                    //   },
                    // },
                    {
                      content: 'Form Container',
                      onClick: () => {
                        setFormContainerModal(true);
                      },
                    },
                    {
                      content: 'Time Ago',
                      onClick: () => {
                        setTimeAgoModal(true);
                      },
                    },
                  ]}
                />
              </Popover>
            </div>

            <DraggableModal open={accordianModal} handleToggle={() => setAccordianModal(false)}>
              <AccordionForm />
            </DraggableModal>
            <DraggableModal open={imageModal} handleToggle={() => setImageModal(false)}>
              <ImageForm />
            </DraggableModal>
            {/* <DraggableModal
              open={checkorRadioModal}
              handleToggle={() => setCheckorRadioModal(false)}
            >
              <CheckboxnRadioForm />
            </DraggableModal> */}
            <DraggableModal
              open={formContainerModal}
              handleToggle={() => setFormContainerModal(false)}
            >
              <FormContainer />
            </DraggableModal>
            <DraggableModal open={timeAgoModal} handleToggle={() => setTimeAgoModal(false)}>
              <TimeagoForm />
            </DraggableModal>
          </>
        )}
        {hasReadOnlyTag && (
          <div className={styles.TagWrapper}>
            <Tag color="yellow">
              <span>Read Only</span>
            </Tag>
          </div>
        )}

        {hasPopover && (
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
                <MoreHoriz />

                <ScreenReaderOnly>More</ScreenReaderOnly>
              </Button>
            }
          >
            <ActionList actions={popoverActions} />
          </Popover>
        )}
      </div>

      <TabComponent />

      <InsertSnippetModal
        open={isSnippetModalOpen}
        onClose={() => setSnippetModalOpen(false)}
        loading={false}
      />

      <ConfirmationModal
        open={isAMPModalOpen}
        title="Are you sure you want to insert the AMP Email Boilerplate?"
        content={<p>Any existing markup in the AMP tab will be lost.</p>}
        confirmVerb="Insert"
        onCancel={() => setAMPModalOpen(false)}
        onConfirm={handleAMPConfirmClick}
      />
    </Panel>
  );
};

export default EditSection;

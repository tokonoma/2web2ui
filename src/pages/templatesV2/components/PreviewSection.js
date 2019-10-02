import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import useEditorContext from '../hooks/useEditorContext';
import PreviewErrorFrame from './PreviewErrorFrame';
import PreviewControlBar from './PreviewControlBar';
import PreviewFrame from './PreviewFrame';
import PreviewHeader from './PreviewHeader';
import PreviewContainer from './PreviewContainer';
import styles from './PreviewSection.module.scss';

const PreviewSection = () => {
  const {
    currentTabKey,
    hasFailedToPreview,
    preview,
    previewLineErrors
  } = useEditorContext();

  const getPreviewContent = (tabKey) => {
    switch (tabKey) {
      case 'html':
      case 'amp_html':
        return preview[tabKey];

      case 'test_data':
        if (preview.html) {
          return preview.html;
        } else if (preview.amp_html) {
          return preview.amp_html;
        } else {
          return preview.text;
        }

      case 'text':
        // Must wrap text content in <p> to apply style and must be a string for injecting into iframe
        return `<p style="white-space: pre-wrap">${preview.text}</p>`;

      default:
        return '';
    }
  };

  return (
    <Panel className={styles.PreviewSection}>
      <PreviewControlBar />
      <PreviewContainer>
        {hasFailedToPreview ? (
          // only show full error frame if never able to generate a preview
          <PreviewErrorFrame errors={previewLineErrors} />
        ) : (
          <>
            <PreviewHeader />
            <PreviewFrame
              content={getPreviewContent(currentTabKey) || ''}
              key={currentTabKey} // unmount for each content part
              strict={currentTabKey !== 'amp_html'}
            />
          </>
        )}
      </PreviewContainer>
    </Panel>
  );
};

export default PreviewSection;

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

  // Must wrap text content in <p> to apply style and must be a string for injecting into iframe
  const content = currentTabKey === 'text'
    ? `<p style="white-space: pre-wrap">${preview[currentTabKey]}</p>`
    : preview[currentTabKey];

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
              content={content || ''}
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

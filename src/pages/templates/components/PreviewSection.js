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
  const formatTextContent = (textContent) => `<p style="white-space: pre-wrap">${textContent}</p>`;
  const getPreviewContent = (tabKey) => {
    if (tabKey === 'text') {
      return formatTextContent(preview.text);
    }

    if (tabKey === 'test_data') {
      const keyWithContent = ['html', 'amp_html', 'text'].find((key) => preview[key]);

      if (keyWithContent === 'text') {
        return formatTextContent(preview.text);
      }

      return preview[keyWithContent];
    }

    return preview[tabKey];
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

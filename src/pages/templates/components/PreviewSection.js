import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import useEditorContext from '../hooks/useEditorContext';
import PreviewErrorFrame from './PreviewErrorFrame';
import PreviewFrame from './PreviewFrame';
import styles from './PreviewSection.module.scss';

const PreviewSection = () => {
  const { currentTabKey, hasFailedToPreview, preview } = useEditorContext();

  // Must wrap text content in <p> to apply style and must be a string for injecting into iframe
  const content = currentTabKey === 'text'
    ? `<p style="white-space: pre-wrap">${preview[currentTabKey]}</p>`
    : preview[currentTabKey];

  return (
    <Panel>
      <div className={classNames(styles.PreviewFrameWrapper, 'notranslate')}>
        {hasFailedToPreview && isEmpty(preview) ? (
          // only show full error frame if never able to generate a preview
          <PreviewErrorFrame />
        ) : (
          <PreviewFrame
            content={content || ''}
            key={currentTabKey} // unmount for each content part
            strict={currentTabKey !== 'amp_html'}
          />
        )}
      </div>
    </Panel>
  );
};

export default PreviewSection;

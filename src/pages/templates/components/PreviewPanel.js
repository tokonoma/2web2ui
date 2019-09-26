import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@sparkpost/matchbox';
import classnames from 'classnames';

import useTabs from 'src/hooks/useTabs';
import PreviewFrame from './PreviewFrame';
import styles from './PreviewPanel.module.scss';

const TABS = [
  { content: 'HTML', key: 'html' },
  { content: 'Text', key: 'text' },
  { content: 'AMP HTML', key: 'ampHtml' }
];

const PreviewPanel = ({ Frame, ...props }) => {
  const [selectedTabIndex, tabs] = useTabs(TABS);
  const selectedTabKey = tabs[selectedTabIndex].key;

  // Must wrap text content in <p> to apply style and must be a string for injecting into iframe
  const content = selectedTabKey === 'text'
    ? `<p style="white-space: pre-wrap">${props[selectedTabKey]}</p>`
    : props[selectedTabKey];

  return (
    <div className={classnames(styles.PreviewPanel, 'notranslate')}>
      <Tabs selected={selectedTabIndex} tabs={tabs} />
      <div className={styles.PreviewPanelWrapper}>
        <Frame
          content={content}
          key={selectedTabKey} // must remount frame on content type change
          strict={selectedTabKey !== 'ampHtml'}
        />
      </div>
    </div>
  );
};

PreviewPanel.defaultProps = {
  ampHtml: '',
  html: '',
  text: '',
  Frame: PreviewFrame
};

PreviewPanel.propTypes = {
  ampHtml: PropTypes.string,
  html: PropTypes.string,
  text: PropTypes.string
};

export default PreviewPanel;

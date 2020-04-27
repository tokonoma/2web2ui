import React from 'react';
import classNames from 'classnames';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../hooks/useEditorContext';
import OGStyles from './PreviewContainer.module.scss';
import hibanaStyles from './PreviewContainerHibana.module.scss';

const PreviewContainer = ({ children }) => {
  const { previewDevice } = useEditorContext();
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  if (previewDevice === 'mobile') {
    return (
      <div
        className={classNames(styles.PreviewMobileContainer, 'notranslate')}
        data-id="preview-mobile-phone"
      >
        <div className={styles.PreviewMobilePhone}>
          <div className={styles.PreviewMobilePhoneScreen}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.PreviewContainer} data-id="preview-desktop">
      <div className={classNames(styles.PreviewScreen, 'notranslate')}>{children}</div>
    </div>
  );
};

export default PreviewContainer;

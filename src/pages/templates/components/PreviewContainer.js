import React from 'react';
import classNames from 'classnames';
import useEditorContext from '../hooks/useEditorContext';
import styles from './PreviewContainer.module.scss';
// <div className={classNames(styles.PreviewFrameWrapper, 'notranslate')}>

const PreviewContainer = ({ children }) => {
  const { previewDevice } = useEditorContext();

  if (previewDevice === 'mobile') {
    return (
      <div className={classNames(styles.PreviewMobileContainer, 'notranslate')}>
        <div className={styles.PreviewMobilePhone}>
          <div className={styles.PreviewMobilePhoneScreen}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.PreviewContainer, 'notranslate')}>
      {children}
    </div>
  );
};

export default PreviewContainer;

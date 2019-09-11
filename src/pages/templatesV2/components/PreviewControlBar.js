import React from 'react';
import classNames from 'classnames';
import { UnstyledLink, ScreenReaderOnly } from '@sparkpost/matchbox';
import { DesktopWindows, PhoneAndroid } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import styles from './PreviewControlBar.module.scss';

const PreviewControlBar = () => {
  const { previewDevice, setPreviewDevice } = useEditorContext();

  return (
    <div className={styles.PreviewControlBar}>
      <div className={styles.PreviewDeviceToggle}>
        <UnstyledLink
          children={<DesktopWindows size={24} />}
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'desktop' && styles.active)}
          id="preview-content-desktop-button"
          onClick={() => { setPreviewDevice('desktop'); }}
          to="javascript:void(0);"
          role="button"
        >
          <ScreenReaderOnly>Desktop Preview</ScreenReaderOnly>
        </UnstyledLink>

        <UnstyledLink
          children={<PhoneAndroid size={24} />}
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'mobile' && styles.active)}
          id="preview-content-mobile-button"
          onClick={() => { setPreviewDevice('mobile'); }}
          to="javascript:void(0);"
          role="button"
        >
          <ScreenReaderOnly>Mobile Preview</ScreenReaderOnly>
        </UnstyledLink>
      </div>
    </div>
  );
};

export default PreviewControlBar;

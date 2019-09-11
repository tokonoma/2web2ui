import React from 'react';
import classNames from 'classnames';
import { UnstyledLink, ScreenReaderOnly, Button } from '@sparkpost/matchbox';
import { DesktopWindows, PhoneAndroid } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import styles from './PreviewControlBar.module.scss';

const PreviewControlBar = () => {
  const { previewDevice, setPreviewDevice } = useEditorContext();

  return (
    <div className={styles.PreviewControlBar}>
      <div className={styles.PreviewDeviceToggle}>
        <UnstyledLink
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'desktop' && styles.active)}
          id="preview-content-desktop-button"
          onClick={() => { setPreviewDevice('desktop'); }}
          to="javascript:void(0);"
          role="button"
        >
          <DesktopWindows size={24} />

          <ScreenReaderOnly>Desktop Preview</ScreenReaderOnly>
        </UnstyledLink>

        <UnstyledLink
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'mobile' && styles.active)}
          id="preview-content-mobile-button"
          onClick={() => { setPreviewDevice('mobile'); }}
          to="javascript:void(0);"
          role="button"
        >
          <PhoneAndroid size={24} />

          <ScreenReaderOnly>Mobile Preview</ScreenReaderOnly>
        </UnstyledLink>
      </div>

      <div>
        <Button
          flat
          color="blue"
          size="small"
          title="Opens a dialog"
        >
          Send a Test
        </Button>
      </div>
    </div>
  );
};

export default PreviewControlBar;

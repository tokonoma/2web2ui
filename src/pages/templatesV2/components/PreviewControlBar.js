import React, { useState } from 'react';
import classNames from 'classnames';
import {
  UnstyledLink,
  ScreenReaderOnly,
  Button
} from '@sparkpost/matchbox';
import { DesktopWindows, PhoneAndroid } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import SendTestEmailModal from './SendTestEmailModal';
import styles from './PreviewControlBar.module.scss';

const PreviewControlBar = () => {
  const { previewDevice, setPreviewDevice } = useEditorContext();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.PreviewControlBar}>
      <div className={styles.PreviewDeviceToggle}>
        <UnstyledLink
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'desktop' && styles.active)}
          id="preview-content-desktop-button"
          onClick={() => setPreviewDevice('desktop')}
          to="javascript:void(0);"
          role="button"
        >
          <DesktopWindows size={24} />

          <ScreenReaderOnly>Desktop Preview</ScreenReaderOnly>
        </UnstyledLink>

        <UnstyledLink
          className={classNames(styles.PreviewDeviceButton, previewDevice === 'mobile' && styles.active)}
          id="preview-content-mobile-button"
          onClick={() => setPreviewDevice('mobile')}
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
          onClick={() => setModalOpen(true)}
        >
          Send a Test
        </Button>

        {isModalOpen && <SendTestEmailModal onClose={() => setModalOpen(false)} />}
      </div>
    </div>
  );
};

export default PreviewControlBar;

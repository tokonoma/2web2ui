import React from 'react';
import classNames from 'classnames';
import { DesktopWindows, PhoneAndroid } from '@sparkpost/matchbox-icons';
import { ScreenReaderOnly, UnstyledLink } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../hooks/useEditorContext';
import SendTestEmailButton from './SendTestEmailButton';
import OGStyles from './PreviewControlBar.module.scss';
import hibanaStyles from './PreviewControlBarHibana.module.scss';

const PreviewControlBar = () => {
  const { previewDevice, setPreviewDevice, canSend } = useEditorContext();
  const hasSendTestEmailButton = canSend;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.PreviewControlBar} data-id="preview-contol-bar">
      <div className={styles.PreviewDeviceToggle}>
        <UnstyledLink
          className={classNames(
            styles.PreviewDeviceButton,
            previewDevice === 'desktop' && styles.active,
          )}
          id="preview-content-desktop-button"
          onClick={() => setPreviewDevice('desktop')}
          to="javascript:void(0);"
          role="button"
          data-id="button-desktop-preview"
        >
          <DesktopWindows size={24} />

          <ScreenReaderOnly>Desktop Preview</ScreenReaderOnly>
        </UnstyledLink>

        <UnstyledLink
          className={classNames(
            styles.PreviewDeviceButton,
            previewDevice === 'mobile' && styles.active,
          )}
          id="preview-content-mobile-button"
          onClick={() => setPreviewDevice('mobile')}
          to="javascript:void(0);"
          role="button"
          data-id="button-mobile-preview"
        >
          <PhoneAndroid size={24} />

          <ScreenReaderOnly>Mobile Preview</ScreenReaderOnly>
        </UnstyledLink>
      </div>

      <div>{hasSendTestEmailButton && <SendTestEmailButton />}</div>
    </div>
  );
};

export default PreviewControlBar;

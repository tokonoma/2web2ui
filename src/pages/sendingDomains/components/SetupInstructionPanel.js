import React from 'react';
import { Box, Panel } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { VerifiedIcon, ErrorIcon } from './Icons';
import OGStyles from './SetupInstructionPanel.module.scss';
import hibanaStyles from './SetupInstructionPanelHibana.module.scss';

const SetupInstructionPanel = ({
  children,
  isAutoVerified = false,
  isVerified = false,
  isVerifying = false,
  onVerify,
  recordType,
  verifyButtonIdentifier,
}) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Panel
      actions={[
        !isAutoVerified && {
          color: 'orange',
          content: isVerified ? `Re-verify ${recordType} Record` : `Verify ${recordType} Record`,
          disabled: isVerifying,
          id: verifyButtonIdentifier,
          onClick: onVerify,
        },
      ].filter(Boolean)}
      title={
        <div className={styles.Title}>
          <span>DNS Settings</span>
          <span className={styles.TitleIcon}>{isVerified ? <VerifiedIcon /> : <ErrorIcon />}</span>
        </div>
      }
    >
      {/* TODO: Remove once the `Panel` can support a border below the `title` */}
      <Box mt="400" as="hr" />
      <Panel.Section>{children}</Panel.Section>
    </Panel>
  );
};

export default SetupInstructionPanel;

import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { VerifiedIcon, ErrorIcon } from './Icons';
import styles from './SetupInstructionPanel.module.scss';

const SetupInstructionPanel = ({
  children,
  isAutoVerified = false,
  isVerified = false,
  isVerifying = false,
  onVerify,
  recordType,
  verifyButtonIdentifier
}) => (
  <Panel
    actions={[
      !isAutoVerified && {
        color: 'orange',
        content: isVerified ? `Re-verify ${recordType} Record` : `Verify ${recordType} Record`,
        disabled: isVerifying,
        id: verifyButtonIdentifier,
        onClick: onVerify
      }
    ].filter(Boolean)}
    sectioned
    title={(
      <div>
        <span className={styles.TitleIcon}>
          {isVerified ? <VerifiedIcon /> : <ErrorIcon />}
        </span>
        <span>DNS Settings</span>
      </div>
    )}
  >
    {children}
  </Panel>
);

export default SetupInstructionPanel;

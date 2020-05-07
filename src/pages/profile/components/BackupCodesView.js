import React from 'react';
import BackupCodesList from './BackupCodesList';
import DownloadCodes from './DownloadCodes';
import CopyCodes from './CopyCodes'; //todo use CopyToClipboard component
import PrintCodes from './PrintCodes';
import { Button, Stack } from 'src/components/matchbox';

const BackupCodes = ({ codes }) => (
  <Stack>
    <p>
      <strong>Your shiny new backup codes:</strong>
    </p>

    <BackupCodesList codes={codes} />

    <Button.Group>
      <DownloadCodes codes={codes} />
      <CopyCodes codes={codes} />
      <PrintCodes codes={codes} />
    </Button.Group>
  </Stack>
);

export default BackupCodes;

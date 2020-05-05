import React from 'react';
import { Grid, Panel, Toggle } from 'src/components/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';

export const TogglePanelSection = ({ readOnly, tfaRequired, toggleTfaRequired }) => {
  const tfaRequiredMsg = tfaRequired
    ? 'All users must have two-factor authentication enabled to login to this account.'
    : 'Each user can manage their own two-factor authentication settings.';

  return (
    <Panel.Section>
      <Grid>
        <Grid.Column xs={12} md={10}>
          <LabelledValue label="Status">
            <strong>{tfaRequired ? 'Required' : 'Optional'}</strong>
            <p>{tfaRequiredMsg}</p>
          </LabelledValue>
        </Grid.Column>
        <Grid.Column xs={12} md={2} style={{ textAlign: 'right' }}>
          <Toggle
            id="enforceTfa"
            disabled={readOnly}
            checked={tfaRequired}
            onChange={toggleTfaRequired}
          />
        </Grid.Column>
      </Grid>
    </Panel.Section>
  );
};

export default TogglePanelSection;

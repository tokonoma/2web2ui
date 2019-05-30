import React from 'react';
import { Panel, Grid } from '@sparkpost/matchbox';
import { formatCurrency, formatFullNumber } from 'src/helpers/units';
import styles from './RecipientValidationModal.module.scss';
import cx from 'classnames';
import { RECIPIENT_TIERS } from 'src/constants';

export default ({ onClose, usage }) => {

  let totalCost = 0;
  const TierRows = RECIPIENT_TIERS.map(({ volumeMax, volumeMin, cost }) => {
    let tierCost = 0;

    if (usage > volumeMax) {
      tierCost = (volumeMax - volumeMin) * cost;
    } else {
      tierCost = Math.max(usage - volumeMin, 0) * cost;
    }

    totalCost += tierCost;

    const rowClass = cx(
      styles.PriceRow,
      tierCost <= 0 && styles.SelectedTier
    );

    return (
      <Grid className={rowClass} key={`rv_tier_${volumeMin}_${volumeMax || 'plus'}`}>
        <Grid.Column xs={4} sm={3} smOffset={1} >
          <span className={styles.Bold}>{volumeMax
            ? `${formatFullNumber(volumeMin)} - ${formatFullNumber(volumeMax)}`
            : `${formatFullNumber(volumeMin)}+`} emails</span>
        </Grid.Column>
        <Grid.Column xs={1} style={{ textAlign: 'center' }}>
          <span>at</span>
        </Grid.Column>
        <Grid.Column xs={3}>
          <span className={styles.Bold}>${cost} per email</span>
        </Grid.Column>
        <Grid.Column xs={1} style={{ textAlign: 'center' }}>
          {tierCost > 0 && <span>=</span>}
        </Grid.Column>
        <Grid.Column xs={2} style={{ textAlign: 'right' }}>
          {tierCost > 0 && <span className={styles.Bold}>{formatCurrency(tierCost)}</span>}
        </Grid.Column>
      </Grid>
    );
  });

  return (
    <Panel accent onClose={onClose} title='How was this calculated?'>
      <Panel.Section>
        {TierRows}
      </Panel.Section>
      <Panel.Section>
        <Grid className={styles.TotalCost}>
          <Grid.Column xs={3} xsOffset={5}>
            Total Cost:
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'right' }} xsOffset={1} xs={2}>
            {formatCurrency(totalCost)}
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </Panel>
  );
};

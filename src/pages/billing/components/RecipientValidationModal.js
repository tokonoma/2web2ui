import React from 'react';
import { Panel, Grid } from '@sparkpost/matchbox';
import { formatCurrency, formatFullNumber } from 'src/helpers/units';
import styles from './RecipientValidationModal.module.scss';
import cx from 'classnames';
import { RECIPIENT_TIERS } from 'src/constants';
import _ from 'lodash';

export const totalRVCost = (volume = 0) => {
  let totalCost = 0;

  RECIPIENT_TIERS.forEach(({ volumeMax, volumeMin, cost }) => {
    const tierCost = Math.max(Math.min(volumeMax, volume) - volumeMin, 0) * cost;
    totalCost += tierCost;
  });
  return formatCurrency(totalCost);
};

export default ({ onClose, usage }) => {
  const volumeUsed = _.get(usage, 'recipient_validation.month.used', 0);
  let totalCost = 0;

  const TierRows = RECIPIENT_TIERS.map(({ volumeMax, volumeMin, cost }) => {
    const tierCost = Math.max(Math.min(volumeMax, volumeUsed) - volumeMin, 0) * cost;
    totalCost += tierCost;

    const tierEmpty = tierCost <= 0;

    const rowClass = cx(
      styles.PriceRow,
      tierEmpty && styles.EmptyTier
    );

    return (
      <Grid className={rowClass} key={`rv_tier_${volumeMin}_${volumeMax || 'plus'}`}>
        <Grid.Column xs={4} sm={3} smOffset={1} >
          <span className={styles.Bold}>{volumeMax < Infinity
            ? `${formatFullNumber(volumeMin)} - ${formatFullNumber(volumeMax)}`
            : `${formatFullNumber(volumeMin)}+`} emails</span>
        </Grid.Column>
        <Grid.Column xs={1} style={{ textAlign: 'center' }}>
          <span>at</span>
        </Grid.Column>
        <Grid.Column xs={3}>
          <span className={styles.Bold}>${cost} per email</span>
        </Grid.Column>
        {!tierEmpty &&
        <Grid.Column xs={1} style={{ textAlign: 'center' }}>
          <span>=</span>
        </Grid.Column>
        }
        {!tierEmpty &&
        <Grid.Column xs={2} style={{ textAlign: 'right' }}>
          <span className={styles.Bold}>{formatCurrency(tierCost)}</span>
        </Grid.Column>
        }
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

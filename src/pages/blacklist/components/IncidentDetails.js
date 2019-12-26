import React from 'react';
import { Grid, Tag, Button } from '@sparkpost/matchbox';
import { formatDate } from 'src/helpers/date';
import moment from 'moment';
import { Link } from '@sparkpost/matchbox-icons';
import styles from './IncidentDetails.module.scss';
export default ({
  resourceName,
  blacklistName,
  listedTimestamp,
  resolvedTimestamp,
  daysListed,
  historicalIncidents,
}) => (
  <Grid>
    <Grid.Column lg={2} xs={4}>
      <div className={styles.DetailGroup}>
        <strong>Date Listed</strong>
        <span className={styles.Value}>{formatDate(listedTimestamp)}</span>
      </div>
    </Grid.Column>
    <Grid.Column lg={2} xs={4}>
      <div className={styles.DetailGroup}>
        <strong>Date Resolved</strong>
        <span className={styles.Value}>
          {resolvedTimestamp ? formatDate(resolvedTimestamp) : <Tag color="yellow">Active</Tag>}
        </span>
      </div>
    </Grid.Column>
    <Grid.Column lg={2} xs={4}>
      <div className={styles.DetailGroup}>
        <strong>Days Listed</strong>
        <span className={styles.Value}>{daysListed}</span>
      </div>
    </Grid.Column>
    <Grid.Column lgOffset={1} lg={5} xs={12}>
      <div className={styles.DetailGroup}>
        <strong>Historical Incidents</strong>
        {historicalIncidents.length === 0 ? (
          <span>{`No historical incidents for ${resourceName} on ${blacklistName}`}</span>
        ) : null}
        {historicalIncidents.map(({ id, occurred_at_formatted, resolved_at_formatted }) => (
          <Link to={`/blacklist/incidents/${id}`}>
            {`Listed ${occurred_at_formatted} | Resolved ${resolved_at_formatted}`}
          </Link>
        ))}
      </div>
    </Grid.Column>
    <Grid.Column xs={12}>
      <Button
        color="orange"
        className={styles.EngagementButton}
        to={`/reports/summary?from=${moment
          .utc(listedTimestamp)
          .subtract('7', 'days')
          .format()}&to=${moment.utc().format()}&range=custom&`}
      >
        View Engagement
      </Button>
    </Grid.Column>
  </Grid>
);

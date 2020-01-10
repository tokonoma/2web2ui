import React from 'react';
import { Grid, Tag, Button } from '@sparkpost/matchbox';
import { formatDate } from 'src/helpers/date';
import { domainRegex } from 'src/helpers/regex';
import cx from 'classnames';
import moment from 'moment';
import { PageLink } from 'src/components';
import styles from './IncidentDetails.module.scss';
export default ({
  resourceName,
  blacklistName,
  listedTimestamp,
  resolvedTimestamp,
  daysListed,
  historicalIncidents,
}) => {
  const engagementSummaryFrom = moment
    .utc(listedTimestamp)
    .subtract('7', 'days')
    .format();

  const now = moment.utc();
  let engagementSummaryTo = now.format();

  if (resolvedTimestamp) {
    const timestamp = moment.utc(resolvedTimestamp);
    const weekLater = timestamp.add('7', 'days');
    if (weekLater.isBefore(now)) {
      engagementSummaryTo = weekLater.format();
    }
  }

  const engagementSummaryResource = resourceName.match(domainRegex)
    ? 'Sending Domain'
    : 'Sending IP';

  return (
    <Grid>
      <Grid.Column lg={2} md={4}>
        <div className={styles.DetailGroup}>
          <strong>Date Listed</strong>
          <span className={styles.Value}>{formatDate(listedTimestamp)}</span>
        </div>
      </Grid.Column>
      <Grid.Column lg={2} md={4}>
        <div className={styles.DetailGroup}>
          <strong>Date Resolved</strong>
          <span className={styles.Value}>
            {resolvedTimestamp ? formatDate(resolvedTimestamp) : <Tag color="yellow">Active</Tag>}
          </span>
        </div>
      </Grid.Column>
      <Grid.Column lg={2} md={4}>
        <div className={styles.DetailGroup}>
          <strong>Days Listed</strong>
          <span className={styles.Value}>{daysListed}</span>
        </div>
      </Grid.Column>
      <Grid.Column xl={5} xlOffset={1} lg={6} xs={12}>
        <div className={cx(styles.DetailGroup, styles.HistoricalIncidents)}>
          <strong>Historical Incidents</strong>
          {historicalIncidents.length === 0 ? (
            <span>{`No historical incidents for ${resourceName} on ${blacklistName}`}</span>
          ) : (
            historicalIncidents.map(({ id, occurred_at_formatted, resolved_at_formatted }) => (
              <PageLink to={`/blacklist/incidents/${id}`} key={id}>
                {`Listed ${occurred_at_formatted} | Resolved ${resolved_at_formatted}`}
              </PageLink>
            ))
          )}
        </div>
      </Grid.Column>
      <Grid.Column xs={12}>
        <Button
          size="small"
          color="orange"
          className={styles.EngagementButton}
          to={`/reports/summary?from=${engagementSummaryFrom}&to=${engagementSummaryTo}&range=custom&filters=${engagementSummaryResource}:${resourceName}`}
        >
          View Engagement
        </Button>
      </Grid.Column>
    </Grid>
  );
};

import React from 'react';
import { Table, Tag } from '@sparkpost/matchbox';
import { AccessTime } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components';
import styles from './RelatedIncidents.module.scss';

export default ({ incidents = [], header = '', type = '' }) => (
  <Table>
    <tbody>
      <Table.Row>
        <Table.HeaderCell>{header}</Table.HeaderCell>
        {incidents.length > 0 && <Table.HeaderCell>Resolved</Table.HeaderCell>}
      </Table.Row>

      {incidents.map(incident => (
        <Table.Row className={styles.Table} key={incident.id}>
          <Table.Cell>
            <div>
              <PageLink to={`/blacklist/incidents/${incident.id}`}>
                <strong>
                  {type === 'blacklist' ? incident.resource : incident.blacklist_name}
                </strong>
              </PageLink>
              <div>
                <AccessTime className={styles.TimeIcon} />
                <span>{`Listed ${incident.occurred_at_formatted}`}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <div className={styles.Resolved}>
              {incident.resolved_at_formatted || <Tag color="yellow">Active</Tag>}
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </tbody>
  </Table>
);

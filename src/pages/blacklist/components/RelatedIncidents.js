import React from 'react';
import { Table, Tag } from '@sparkpost/matchbox';
import { AccessTime } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components';
import styles from './RelatedIncidents.module.scss';

export default ({ incident, incidents = [], header = '', type = '' }) => (
  <>
    <Table>
      <tbody>
        <Table.Row>
          <Table.HeaderCell>{header}</Table.HeaderCell>
          {incidents.length > 0 ? <Table.HeaderCell>Resolved</Table.HeaderCell> : null}
        </Table.Row>

        {incidents
          .filter(i => i.id !== incident.id)
          .map(incident => (
            <Table.Row>
              <Table.Cell>
                <div>
                  <PageLink to={`/blacklist/incidents/${incident.id}`}>
                    {type === 'blacklist' ? incident.resource : incident.blacklist_name}
                  </PageLink>
                  <div>
                    <AccessTime />
                    <span>{`Listed ${incident.occurred_at_formatted}`}</span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span>{incident.resolved_at_formatted || <Tag color="yellow">Active</Tag>}</span>
              </Table.Cell>
            </Table.Row>
          ))}
      </tbody>
    </Table>
    {incidents.length === 0 ? (
      <div align="justify" className={styles.NoResults}>
        <div>{`No Recent ${
          type === 'blacklist' ? incident.blacklist_name : incident.resource
        } incidents`}</div>
      </div>
    ) : null}
  </>
);

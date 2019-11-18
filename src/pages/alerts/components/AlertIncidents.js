import React from 'react';
import { Panel, Table, Tag } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { METRICS, FILTERS_FRIENDLY_NAMES } from '../constants/formConstants';
import { MAILBOX_PROVIDERS } from 'src/constants';
import { getEvaluatorOptions } from '../helpers/alertForm';
import { roundToPlaces } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';
import styles from './AlertIncidents.module.scss';

const formatDateTime = (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] h:mma');

const AlertIncidents = ({ incidents = [], alert, subaccountIdToString }) => {

  const { metric, source } = alert;
  const { suffix } = getEvaluatorOptions(metric, source);

  const columns = [
    { label: 'Triggered', sortKey: 'first_fired' },
    { label: 'Resolved', sortKey: 'last_fired' },
    { label: 'For' },
    { label: METRICS[metric], sortKey: 'triggered_value', width: '20%' }
  ];

  const getRowData = (props) => {
    const { first_fired, last_fired, status, triggered_value, filters } = props;


    const renderTags = () => {

      const filterTags = _.map(filters, (value, key) => {
        const finalValue = value === 'NULL' ? null : value;
        const getTagValue = (value) => {
          switch (key) {
            case 'subaccount_id':
              return subaccountIdToString(value);
            case 'mailbox_provider':
              return MAILBOX_PROVIDERS[value];
            default:
              return value;
          }
        };

        return (
          finalValue &&
          <span key={key}>
            <strong className={styles.BoldInline}>{FILTERS_FRIENDLY_NAMES[key]}</strong>
            &nbsp;
            <Tag>{getTagValue(finalValue)}</Tag>
          </span>
        );
      });

      const joinTags = filterTags.reduce((acc, tag) => {
        if (!acc) {
          return [tag];
        }
        if (!tag) {
          return acc;
        }
        return [...acc, <span key={'join_and'}> and </span>, tag];
      }, null);

      return joinTags;
    };

    return [
      <div>{formatDateTime(first_fired)}</div>,
      <div>{status === 'Active' ? <Tag color='yellow'>Active</Tag> : formatDateTime(last_fired)}</div>,
      <div className={styles.IncidentFilters}>{renderTags()}</div>,
      <div className={styles.paddedCell}>{roundToPlaces(triggered_value, 3)}{suffix}</div>
    ];
  };

  const TableWrapper = (props) => (
    <>
      <div>
        <Table>{props.children}</Table>
      </div>
    </>
  );

  return (
    <Panel title='Alert Incidents'>
      {incidents.length <= 0
        ? <Empty message='No incidents'/>
        : <TableCollection
          wrapperComponent={TableWrapper}
          rows={incidents}
          columns={columns}
          getRowData={getRowData}
          pagination
          defaultSortColumn='first_fired'
          defaultSortDirection='desc'
        />
      }

    </Panel>
  );
};

export default AlertIncidents;

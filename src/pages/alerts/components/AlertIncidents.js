import React from 'react';
import { Panel, Table, Tag } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { METRICS, FILTERS_FRIENDLY_NAMES } from '../constants/formConstants';
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
      const { subaccount_id, ...rest } = filters;

      const subaccountTag = subaccount_id &&
      <span key='subaccounts'>
        <h6 className={styles.BoldInline}>Subaccounts</h6>
        &nbsp;
        <Tag>{subaccountIdToString(subaccount_id)}</Tag>
      </span>;

      const otherTags = _.map(rest, (value, key) => {
        const finalValue = value === 'NULL' ? null : value;
        return (
          finalValue &&
          <span key={key}>
            <h6 className={styles.BoldInline}>{FILTERS_FRIENDLY_NAMES[key]}</h6>
            &nbsp;
            <Tag>{finalValue}</Tag>
          </span>
        );
      });

      return (
        [
          subaccountTag,
          otherTags.length > 0 ? ' and ' : null,
          ...otherTags
        ]
      );
    };

    return [
      <div>{formatDateTime(first_fired)}</div>,
      <div>{status === 'Active' ? <Tag color='yellow'>Active</Tag> : formatDateTime(last_fired)}</div>,
      <div>{renderTags()}</div>,
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

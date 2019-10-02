import React from 'react';
import { Modal, Table, Panel } from '@sparkpost/matchbox';
import { FEATURE_COMPARISON, PLANS } from './../constants';
import _ from 'lodash';
import styles from './FeatureComparisonModal.module.scss';
import classNames from 'classnames';
import { Check, Close } from '@sparkpost/matchbox-icons';
export function Row({ featureName, ...featureValues }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}> {featureName} </Table.Cell>
    {_.map(featureValues, (val, key) => <Table.Cell key={key} className={classNames(styles.FeatureComparisonCell,
      key === 'Test Account' && styles.PlanOne,
      key === 'Starter Plans' && styles.PlanTwo,
      key === 'Premier Plans' && styles.PlanThree)}> {renderCell(val)} </Table.Cell>)}
  </Table.Row>;
}
export function HeaderRow({ plans }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}>  </Table.Cell>
    {plans.map((plan) =>
      <Table.Cell key={plan} className={classNames(styles.FeatureComparisonCell,
        plan === 'Test Account' && styles.PlanOne,
        plan === 'Starter Plans' && styles.PlanTwo,
        plan === 'Premier Plans' && styles.PlanThree,
        styles.PlanName)}> {plan} </Table.Cell>)}
  </Table.Row>;
}
export function GroupHeading({ groupName, colSpan }) {
  return <Table.Row>
    <Table.HeaderCell colSpan={colSpan} className={styles.GroupHeading}>
      {groupName}
    </Table.HeaderCell>
  </Table.Row>;
}

export function renderCell(cellValue) {
  if (typeof cellValue === 'boolean') { return cellValue ? <Check/> : <Close className={styles.NotAvailable}/>; }
  if (typeof cellValue === 'string') {
    return <div>
      {cellValue.split('\n').map((item, index) =>
        <div key={index} className={index > 0 ? styles.SmallerFont : ''}>
          {item}
        </div>)}
    </div>
    ;
  }
  return cellValue;
}
function ComparisonModal({ open, handleClose }) {
  return (<Modal open={open} showCloseButton={true} onClose={handleClose} >
    <Panel>
      <div className={styles.FeatureComparisonTable}>
        <Table>
          <tbody>
            <HeaderRow plans={PLANS}/>
          </tbody>
        </Table>
        {_.map(FEATURE_COMPARISON, (featureObj, groupName) =>
          <Table key={groupName}>
            <tbody>
              <GroupHeading groupName={groupName} colSpan={PLANS.length + 1} />
              {_.map(featureObj, (featureValues, featureName) =>
                <Row key={featureName} featureName={featureName} {...featureValues}/>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </Panel>
  </Modal>);
}
export default ComparisonModal;

import React from 'react';
import { Modal, Table, Panel } from '@sparkpost/matchbox';
import { FEATURE_COMPARISON, PLANS } from './../constants';
import _ from 'lodash';
import styles from './FeatureComparisonModal.module.scss';
import classNames from 'classnames';
import { Check, Close } from '@sparkpost/matchbox-icons';
export function Row({ featureName, ...value }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}> {featureName} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanOne)}> {renderCell(value[PLANS[0]])} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanTwo)}> {renderCell(value[PLANS[1]])} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanThree)}> {renderCell(value[PLANS[2]])} </Table.Cell>
  </Table.Row>;
}
export function HeaderRow({ plans }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}>  </Table.Cell>
    {plans.map((plan,index) => <Table.Cell key={plan} className={classNames(styles.FeatureComparisonCell,
      index + 1 === 1 ? styles.PlanOne : '',
      index + 1 === 2 ? styles.PlanTwo : '',
      index + 1 === 3 ? styles.PlanThree : '',
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
  if (typeof cellValue === 'boolean') { return cellValue ? <Check/> : <Close/>; }
  if (typeof cellValue === 'string') {
    return <>{cellValue.split('\n').map((item, index) => <div key={index} className={index > 0 ? styles.SmallerFont : ''}>{item}</div>)}</>
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
              {_.map(featureObj, (value, featureName) => <Row key={featureName} featureName={featureName} {...value}/>)}
            </tbody>
          </Table>
        )}
      </div>
    </Panel>
  </Modal>);
}
export default ComparisonModal;

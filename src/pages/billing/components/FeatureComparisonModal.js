import React from 'react';
import { Modal, Table, Panel } from '@sparkpost/matchbox';
import { FEATURE_COMPARISON, PLANS } from './../constants';
import _ from 'lodash';
import styles from './FeatureComparisonModal.module.scss';
import classNames from 'classnames';
import { Check, Close } from '@sparkpost/matchbox-icons';
export function Row({ featureName, testAccount, starterPlans, premierPlans }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}> {featureName} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanOne)}> {renderCell(testAccount)} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanTwo)}> {renderCell(starterPlans)} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanThree)}> {renderCell(premierPlans)} </Table.Cell>
  </Table.Row>;
}
export function HeaderRow({ plans }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}>  </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanOne, styles.PlanName)}> {plans[0]} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanTwo, styles.PlanName)}> {plans[1]} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComparisonCell, styles.PlanThree, styles.PlanName)}> {plans[2]} </Table.Cell>
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
        {_.map(FEATURE_COMPARISON, (featureArray, groupName) =>
          <Table key={groupName}>
            <tbody>
              <GroupHeading groupName={groupName} colSpan={featureArray.length} />
              {featureArray.map((f,index) => <Row key={index} featureName={f[0]} testAccount={f[1]} starterPlans={f[2]} premierPlans={f[3]}/>)}
            </tbody>
          </Table>
        )}
      </div>
    </Panel>
  </Modal>);
}
export default ComparisonModal;

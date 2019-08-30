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
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanOne)}> {renderCell(testAccount)} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanTwo)}> {renderCell(starterPlans)} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanThree)}> {renderCell(premierPlans)} </Table.Cell>
  </Table.Row>;
}
export function HeaderRow({ plans }) {
  return <Table.Row>
    <Table.Cell className={styles.FeatureCell}>  </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanOne, styles.TableCaption)}> {plans[0]} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanTwo, styles.TableCaption)}> {plans[1]} </Table.Cell>
    <Table.Cell className={classNames(styles.FeatureComaprisonCell, styles.PlanThree, styles.TableCaption)}> {plans[2]} </Table.Cell>
  </Table.Row>;
}
export function GroupHeading({ groupName, colSpan }) {
  return <Table.Row>
    <Table.HeaderCell colSpan={colSpan} className={styles.GroupHeading}>
      {groupName}
    </Table.HeaderCell>
  </Table.Row>;
}
function Icon({ value }) {
  return value ? <Check/> : <Close/>;
}
export function renderCell(cellValue) {
  if (typeof cellValue === 'boolean') { return <Icon value={cellValue}/> ; }
  if (typeof cellValue === 'string') {
    if (cellValue.indexOf('\n') !== -1) {
      return <div> {cellValue.substring(0,cellValue.indexOf('\n'))} <br/>
        <span style={{ fontSize: '12px' }}> {cellValue.substring(cellValue.indexOf('\n'),cellValue.length)}</span>
      </div>;
    }
  }
  return cellValue;
}
function ComparisonModal({ open, handleClose }) {
  return (<Modal open={open} showCloseButton={true} onClose={handleClose} >
    <Panel>
      <div className={styles.FeatureComparisonTable}>
        <Table>
          <HeaderRow plans={PLANS}/>
        </Table>
        {_.map(FEATURE_COMPARISON, (featureArray, groupName) => <>
          <Table>
            <GroupHeading groupName={groupName} colSpan={featureArray.length} />
            {featureArray.map((f) => <Row featureName={f[0]} testAccount={f[1]} starterPlans={f[2]} premierPlans={f[3]}/>)}
          </Table>
      </>)}
      </div>
    </Panel>
  </Modal>);
}
export default ComparisonModal;

import React from 'react';
import { Modal, Table, Panel } from '@sparkpost/matchbox';
import { FEATURE_COMPARISON } from './../constants';
import _ from 'lodash';
function Row({ featureName, testAccount, starterPlans, premierPlans }) {
  return <Table.Row>
    <Table.Cell> {featureName} </Table.Cell>
    <Table.Cell> {testAccount} </Table.Cell>
    <Table.Cell> {starterPlans} </Table.Cell>
    <Table.Cell> {premierPlans} </Table.Cell>
  </Table.Row>;
}
function GroupHeading({ groupName, colSpan }) {
  return <Table.Row>
    <Table.HeaderCell colSpan={colSpan}>
      {groupName}
    </Table.HeaderCell>
  </Table.Row>;
}
function ComparisonModal({ open, handleClose }) {
  return (<Modal open={open} showCloseButton={true} onClose={handleClose}>
    <Panel>

      {_.map(FEATURE_COMPARISON, (featureArray, groupName) => <>
          <Table>
            <GroupHeading groupName={groupName} colSpan={featureArray.length}/>
            <Table>
              {featureArray.map((f) => <Row featureName={f[0]} testAccount={f[1]} starterPlans={f[2]} premierPlans={f[3]}/>)}
            </Table>
          </Table>
      </>)}

    </Panel>
  </Modal>);
}
export default ComparisonModal;

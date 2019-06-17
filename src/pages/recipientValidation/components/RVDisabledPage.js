import { Component } from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RVDisabledPage.module.scss';
import { currentPlanSelector } from 'src/selectors/accountBillingInfo';
import { selectCondition } from 'src/selectors/accessConditionState';
import { isSelfServeBilling } from 'src/helpers/conditions/account';
import { connect } from 'react-redux';
import { update as updateAccount } from 'src/actions/account';
import { Loading } from 'src/components';
import { formatFullNumber } from 'src/helpers/units';

//TODO Use from constants
const RECIPIENT_VALIDATION_TIERS = [
  { volumeMin: 0, volumeMax: 5000, cost: 0.01 },
  { volumeMin: 5000, volumeMax: 10000, cost: 0.008 },
  { volumeMin: 10000, volumeMax: 50000, cost: 0.006 },
  { volumeMin: 50000, volumeMax: 100000, cost: 0.004 },
  { volumeMin: 100000, volumeMax: 250000, cost: 0.003 },
  { volumeMin: 250000, volumeMax: 750000, cost: 0.0015 },
  { volumeMin: 750000, volumeMax: 1000000, cost: 0.001 },
  { volumeMin: 1000000, volumeMax: Infinity, cost: 0.00075 }
];

export class RVDisabledPage extends Component {
  getRows = () => {
    const rows = RECIPIENT_VALIDATION_TIERS.map((row, index) => {
      //Skips first row
      if (index < 1) {
        return;
      }
      return (
        <Table.Row key = {row.volumeMin}>
          <Table.Cell width = {'40%'}>
            <strong>{formatFullNumber(row.volumeMin)}</strong>
            {row.volumeMax < Infinity //Last row with volumeMax of Infinity has different wording
              ? <span> to <strong>{formatFullNumber(row.volumeMax)}</strong></span>
              : <>+</>}
          </Table.Cell>
          <Table.Cell>
            <strong>${row.cost}</strong> per email
          </Table.Cell>
        </Table.Row>);
    });

    //Adds the header & first row (includes both in same cell)
    rows.unshift(
      <Table.Row key = {RECIPIENT_VALIDATION_TIERS[0].volumeMin}>
        <Table.Cell >
          <strong className = {styles.Header}>
            Number of Emails
          </strong>
          <strong>{RECIPIENT_VALIDATION_TIERS[0].volumeMin}</strong> to <strong>{RECIPIENT_VALIDATION_TIERS[0].volumeMax}</strong>
        </Table.Cell>
        <Table.Cell >
          <strong className = {styles.Header}>
            Cost
          </strong>
          <strong>${RECIPIENT_VALIDATION_TIERS[0].cost}</strong> per email
        </Table.Cell>
      </Table.Row>
    );

    return rows;
  };

  renderActionButton = () => {
    const { isSelfServeBilling, isFree } = this.props;
    if (!isSelfServeBilling) {
      return null;
    }
    return (isFree)
      ? (<Button primary component={Link} to={'/account/billing'}>Upgrade your plan</Button>)
      : (<Button primary onClick={this.enableRV}>Enable Recipient Validation</Button>);
  };

  enableRV = () => {
    const body = {
      options: {
        recipient_validation: true
      }
    };
    this.props.updateAccount(body);
  };

  render() {
    if (this.props.accountUpdateLoading) {
      return <Loading/>;
    }
    return (
      <Page title='Recipient Validation'>
        <div className={styles.Description}>
          <p>
          Protect your reputation by guarding against bounces, errors, and even fraud. Recipient Validation is an easy,
          efficient way to verify that addresses are valid before you send. We run emails through a series of checks
          to catch many common problems, including syntax errors and non-existent mailboxes.
          </p>
          <p>
          We have a monthly pay-as-you-go plan using tiered pricing. The more you validate, the less you pay per message.
          </p>
        </div>
        <Panel className = {styles.Table}>
          <Table >
            <tbody className={styles.Table}>
              {this.getRows()}
            </tbody>
          </Table>
        </Panel>
        {this.renderActionButton()}
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isSelfServeBilling: selectCondition(isSelfServeBilling)(state),
  isFree: currentPlanSelector(state).isFree,
  accountUpdateLoading: state.account.updateLoading
});

export default (connect(mapStateToProps, { updateAccount })(RVDisabledPage));

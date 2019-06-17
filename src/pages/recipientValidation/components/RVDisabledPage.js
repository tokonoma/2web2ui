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
import { RECIPIENT_VALIDATION_TIERS } from 'src/constants';

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
              ? <> to <strong>{formatFullNumber(row.volumeMax)}</strong></>
              : <>+</>}
          </Table.Cell>
          <Table.Cell>
            <strong>{row.displayedCost}</strong> per email
          </Table.Cell>
        </Table.Row>);
    });

    //Adds the header & first row (includes both in same cell)
    const firstRow = RECIPIENT_VALIDATION_TIERS[0];
    rows.unshift(
      <Table.Row key = {firstRow.volumeMin}>
        <Table.Cell>
          <strong className = {styles.Header}>
            Number of Emails
          </strong>
          <strong>{formatFullNumber(firstRow.volumeMin)}</strong> to <strong>{formatFullNumber(firstRow.volumeMax)}</strong>
        </Table.Cell>
        <Table.Cell>
          <strong className = {styles.Header}>
            Cost
          </strong>
          <strong>{firstRow.displayedCost}</strong> per email
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
          <Table>
            <tbody>
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

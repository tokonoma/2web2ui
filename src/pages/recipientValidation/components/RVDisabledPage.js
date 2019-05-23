import { Component } from 'react';
import { Page, Panel, Table, Button, UnstyledLink } from '@sparkpost/matchbox';
import React from 'react';
import styles from './RVDisabledPage.module.scss';
import { currentPlanSelector } from 'src/selectors/accountBillingInfo';
import { selectCondition } from 'src/selectors/accessConditionState';
import { isSelfServeBilling } from 'src/helpers/conditions/account';
import { connect } from 'react-redux';
import { update as updateAccount } from 'src/actions/account';
import { showAlert } from 'src/actions/globalAlert';


const priceData = [
  ['5,000', '10,000', '$0.008'],
  ['10,000', '50,000', '$0.006'],
  ['50,000', '100,000', '$0.004'],
  ['100,000', '250,000', '$0.003'],
  ['250,000', '750,000', '$0.0015'],
  ['750,000', '1,000,000', '$0.00100']
];
const priceDataEdge = [
  ['0', '5,000', '$0.010'],
  ['1,000,000+', '$0.00075']
];

export class RVDisabledPage extends Component {
  getRows = () => {
    const rows = priceData.map((row, i) => (
      <Table.Row key = {row[0]}>
        <Table.Cell width = {'40%'}>
          <strong>{row[0]}</strong> to <strong>{row[1]}</strong>
        </Table.Cell>
        <Table.Cell>
          <strong>{row[2]}</strong> per email
        </Table.Cell>
      </Table.Row>));

    rows.unshift(
      <Table.Row key = {priceDataEdge[0][0]}>
        <Table.Cell >
          <strong className = {styles.Header}>
            Number of Emails
          </strong>
          <br className={styles.HeaderSpace}/>
          <strong>{priceDataEdge[0][0]}</strong> to <strong>{priceDataEdge[0][1]}</strong>
        </Table.Cell>
        <Table.Cell >
          <strong className = {styles.Header}>
            Cost
          </strong>
          <br className={styles.HeaderSpace}/>
          <strong>{priceDataEdge[0][2]}</strong> per email
        </Table.Cell>
      </Table.Row>
    );

    rows.push(
      <Table.Row key = {priceDataEdge[1][0]}>
        <Table.Cell>
          <strong>{priceDataEdge[1][0]}</strong>
        </Table.Cell>
        <Table.Cell>
          <strong>{priceDataEdge[1][1]}</strong> per email
        </Table.Cell>
      </Table.Row>
    );
    return rows;
  }

  getActionButton = () => {
    const { isSelfServeBilling, isFree } = this.props;
    if (!isSelfServeBilling) {
      return null;
    }
    return (isFree)
      ? (<UnstyledLink component={Button} to={'/account/billing'} primary>Upgrade your plan</UnstyledLink>)
      : (<Button primary onClick={this.enableRV}>Enable Recipient Validation</Button>);
  }

  enableRV = () => {
    const body = {
      options: {
        recipient_validation: true
      }
    };
    return this.props.updateAccount(body)
      .then(() => showAlert({
        type: 'success',
        message: 'RV enabled.'
      }));
  }
  render() {

    return (
      <Page title='Recipient Validation'>
        <div className={styles.Description}>
          <p>
          Protect your reputation by guarding against bounces, errors, and even fraud. Recipient Validation is an easy,
          efficient way to verify that addresses are valid before you send. We run emails through a series of checks
          to catch many common problems, including syntax errors and non-existent mailboxes.
          </p>
          <p>
          We have a monthly pay-as-you-go plan using tiered pricing, The more you validate, the less you pay per message.
          </p>
        </div>
        <Panel className = {styles.Table}>
          <Table >
            <tbody className={styles.Table}>
              {this.getRows()}
            </tbody>
          </Table>

        </Panel>
        {this.getActionButton()}
      </Page>
    );
  }
}
const mapStateToProps = (state) => ({
  isSelfServeBilling: selectCondition(isSelfServeBilling)(state),
  isFree: currentPlanSelector(state).isFree
});

export default (connect(mapStateToProps, { updateAccount })(RVDisabledPage));

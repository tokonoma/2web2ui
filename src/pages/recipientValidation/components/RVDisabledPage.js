import { Component } from 'react';
import { Page, Panel, Button } from '@sparkpost/matchbox';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RVDisabledPage.module.scss';
import { currentPlanSelector } from 'src/selectors/accountBillingInfo';
import { selectCondition } from 'src/selectors/accessConditionState';
import { isSelfServeBilling } from 'src/helpers/conditions/account';
import { connect } from 'react-redux';
import { update as updateAccount } from 'src/actions/account';
import { Loading } from 'src/components';
import RecipientValidationPriceTable from './RecipientValidationPriceTable';

export class RVDisabledPage extends Component {

  renderActionButton = () => {
    const { isSelfServeBilling, isFree } = this.props;
    if (!isSelfServeBilling) {
      return (<Button external primary to='https://www.sparkpost.com/recipient-validation/#recipient-validation-form'>Contact Sales</Button>);
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
          <RecipientValidationPriceTable
            col1Props={{ width: '40%' }}
          />
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

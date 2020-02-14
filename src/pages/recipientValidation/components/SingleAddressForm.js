import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button, Panel, Label } from '@sparkpost/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required, email, maxLength } from 'src/helpers/validation';
import { singleAddress } from 'src/actions/recipientValidation';
import styles from './SingleAddressForm.module.scss';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import classNames from 'classnames';

const formName = 'singleAddressForm';
export class SingleAddressForm extends Component {
  singleAddressForm = values =>
    this.props.history.push(`/recipient-validation/single/${values.address}`);

  singleAddressBody = () => {
    const { isStandAloneRVSet } = this.props;
    return (
      <>
        <div className={classNames(styles.Header, isStandAloneRVSet && styles.HeaderSRV)}>
          Validate a Single Address
        </div>
        <p className={classNames(styles.Subheader, isStandAloneRVSet && styles.SubheaderSRV)}>
          Enter the email address below you would like to validate.
        </p>
        <div className={classNames(styles.Field, isStandAloneRVSet && styles.FieldSRV)}>
          <Label className={styles.FieldLabel} id="email-address-field">
            Email Address
          </Label>

          <Field
            id="email-address-field"
            style={
              !isStandAloneRVSet && {
                height: '3.2rem',
                paddingLeft: '1.5em',
                fontSize: '.9em',
              }
            }
            name="address"
            component={TextFieldWrapper}
            placeholder={'harry.potter@hogwarts.edu'}
            validate={[required, email, maxLength(254)]}
            normalize={(value = '') => value.trim()}
          />
        </div>{' '}
      </>
    );
  };
  render() {
    const { valid, pristine, submitting, handleSubmit, isStandAloneRVSet } = this.props;
    const submitDisabled = pristine || !valid || submitting;
    const buttonContent = submitting ? 'Validating...' : 'Validate';

    return (
      <Panel.Section>
        {!isStandAloneRVSet && (
          <form onSubmit={handleSubmit(this.singleAddressForm)}>
            {this.singleAddressBody()}
            <div className={styles.Submit}>
              <Button size="large" fullWidth primary submit disabled={submitDisabled}>
                {buttonContent}
              </Button>
            </div>
          </form>
        )}
        {isStandAloneRVSet && this.singleAddressBody()}
      </Panel.Section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
  };
};

const WrappedForm = reduxForm({ form: formName })(SingleAddressForm);
export default withRouter(connect(mapStateToProps, { singleAddress })(WrappedForm));

export const SingleAddressTab = withRouter(
  connect(mapStateToProps, { singleAddress })(SingleAddressForm),
);

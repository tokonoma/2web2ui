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

const formName = 'singleAddressForm';
export class SingleAddressForm extends Component {
  singleAddressForm = values =>
    this.props.history.push(`/recipient-validation/single/${values.address}`);

  getClassName = className => (!this.props.isStandAloneRVSet ? className : className + 'SRV');
  render() {
    const { valid, pristine, submitting, handleSubmit } = this.props;
    const submitDisabled = pristine || !valid || submitting;
    const buttonContent = submitting ? 'Validating...' : 'Validate';

    return (
      <Panel.Section>
        <form onSubmit={handleSubmit(this.singleAddressForm)}>
          <div className={styles[this.getClassName('Header')]}>Validate a Single Address</div>
          <p className={styles[this.getClassName('Subheader')]}>
            Enter the email address below you would like to validate.
          </p>
          <div className={styles[this.getClassName('Field')]}>
            <Label className={styles.FieldLabel} id="email-address-field">
              Email Address
            </Label>

            <Field
              id="email-address-field"
              style={styles[this.getClassName('EmailAddressFieldSRV')]}
              name="address"
              component={TextFieldWrapper}
              placeholder={'harry.potter@hogwarts.edu'}
              validate={[required, email, maxLength(254)]}
              normalize={(value = '') => value.trim()}
            />
          </div>
          {!this.props.isStandAloneRVSet && (
            <div className={styles.Submit}>
              <Button size="large" fullWidth primary submit disabled={submitDisabled}>
                {buttonContent}
              </Button>
            </div>
          )}
        </form>
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

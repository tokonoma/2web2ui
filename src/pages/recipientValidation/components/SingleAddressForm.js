import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field } from 'redux-form';
import { Panel } from '@sparkpost/matchbox';
import { Label } from 'src/components/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required, email, maxLength } from 'src/helpers/validation';
import { singleAddress } from 'src/actions/recipientValidation';
import styles from './SingleAddressForm.module.scss';

import classNames from 'classnames';

export class SingleAddressForm extends Component {
  singleAddressForm = values =>
    this.props.history.push(`/recipient-validation/single/${values.address}`);

  singleAddressBody = () => {
    return (
      <>
        <div className={classNames(styles.Header)}>Validate a Single Address</div>
        <p className={classNames(styles.Subheader)}>
          Enter the email address below you would like to validate.
        </p>
        <div className={classNames(styles.Field)}>
          <Label className={styles.FieldLabel} id="email-address-field">
            Email Address
          </Label>

          <Field
            id="email-address-field"
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
    return <Panel.Section>{this.singleAddressBody()}</Panel.Section>;
  }
}

export const SingleAddressTab = withRouter(connect(null, { singleAddress })(SingleAddressForm));

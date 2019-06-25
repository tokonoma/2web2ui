import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button, Panel } from '@sparkpost/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required, email, maxLength } from 'src/helpers/validation';
import { singleAddress } from 'src/actions/recipientValidation';
import styles from './SingleAddressForm.module.scss';

const formName = 'singleAddressForm';
export class SingleAddressForm extends Component {

  singleAddressForm = (values) => this.props.singleAddress(values.address).then(() =>
    this.props.history.push('/recipient-validation/result')
  );

  render() {
    const { valid, pristine, submitting, handleSubmit } = this.props;
    const submitDisabled = pristine || !valid || submitting;
    const buttonContent = (submitting) ? 'Validating...' : 'Validate';

    return (
      <Panel.Section>
        <form onSubmit={handleSubmit(this.singleAddressForm)}>
          <div className={styles.Header}>Validate a Single Address</div>
          <p className={styles.Subheader}>Enter the email address below you would like to validate.</p>
          <div className={styles.Field}>
            <Field
              style={{ height: '3.2rem', paddingLeft: '1.5em', fontSize: '.9em' }}
              name='address'
              component={TextFieldWrapper}
              placeholder={'harry.potter@hogwarts.edu'}
              validate={[required, email, maxLength(254)]}
              normalize={(value = '') => value.trim()}
            />
          </div>
          <div className={styles.Submit}>
            <Button size='large' fullWidth primary submit disabled={submitDisabled}>{buttonContent}</Button>
          </div>
        </form>
      </Panel.Section>
    );
  }
}


const WrappedForm = reduxForm({ form: formName })(SingleAddressForm);

export default withRouter(connect(null, { singleAddress })(WrappedForm));

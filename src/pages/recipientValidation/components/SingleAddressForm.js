import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Panel } from '@sparkpost/matchbox';
import { TextFieldWrapper } from 'src/components';
import { required, email, maxLength } from 'src/helpers/validation';
import { singleAddress } from 'src/actions/recipientValidation';
import SingleResult from './SingleResult';
import styles from './SingleAddressForm.module.scss';

const formName = 'singleAddressForm';
export class SingleAddressForm extends Component {

  singleAddressForm = (values) => this.props.singleAddress(values.address);

  render() {
    const { singleResults, valid, pristine, submitting, handleSubmit } = this.props;
    const submitDisabled = pristine || !valid || submitting;
    const buttonContent = (submitting) ? 'Validating...' : 'Validate';

    return (
      <Fragment>
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
        {singleResults && (
          <Panel.Section>
            <SingleResult singleResults={singleResults}/>
          </Panel.Section>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ recipientValidation }) => ({
  singleResults: recipientValidation.singleResults
});

const WrappedForm = reduxForm({ form: formName })(SingleAddressForm);

export default connect(mapStateToProps, { singleAddress })(WrappedForm);

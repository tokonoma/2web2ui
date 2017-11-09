import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@sparkpost/matchbox';
import { required, minLength } from 'src/helpers/validation';

import { TextFieldWrapper } from 'src/components';

export class PasswordForm extends Component {
  render() {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          type="password"
          name='current_password'
          component={TextFieldWrapper}
          id='currentPassword'
          label='Current Password'
          validate={required}
        />

        <Field
          type="password"
          name='new_password'
          id='newPassword'
          label='New Password'
          component={TextFieldWrapper}
          validate={[required, minLength(8)]}
        />

        <Button submit disabled={submitting || pristine}>
          {submitting ? 'Updating Passwword' : 'Update Password'}
        </Button>
      </form>
    );
  }
}

const mapStateToProps = ({ form, currentUser }) => ({
  theForm: form.profileName // breaks if you use a prop name 'form'
});

const formOptions = {
  form: 'passwordForm',
  enableReinitialize: true // required to update initial values from redux state
};

// breaks if you do reduxForm first
export default connect(mapStateToProps)(reduxForm(formOptions)(PasswordForm));

import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reset, reduxForm } from 'redux-form';
import { Box, Button, Checkbox, Stack } from 'src/components/matchbox';
import { TextFieldWrapper, CheckboxWrapper } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';

import { showAlert } from 'src/actions/globalAlert';
import { createOrUpdateSuppressions } from 'src/actions/suppressions';
import SubaccountTypeaheadWrapper from 'src/components/reduxFormWrappers/SubaccountTypeaheadWrapper';
import { required, email } from 'src/helpers/validation';
const FORM_NAME = 'addSuppression';

const maxWidth = '860px';

export class AddForm extends Component {
  atLeastOne = (_value, { types }) =>
    !_.some(_.values(types)) ? 'You must select at least one Type' : undefined;

  onSubmit = ({ description, recipient, subaccount, types }) => {
    const { reset, showAlert } = this.props;
    const recipients = _.reduce(
      types,
      (result, checked, type) => {
        if (!checked) {
          return result;
        }

        return [...result, { recipient, description, type }];
      },
      [],
    );

    return this.props.createOrUpdateSuppressions(recipients, subaccount).then(() => {
      showAlert({ message: 'Successfully updated your suppression list', type: 'success' });
      reset(FORM_NAME);
    });
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Stack>
            <Box maxWidth={maxWidth}>
              <Field
                name="recipient"
                component={TextFieldWrapper}
                validate={[required, email]}
                required
                label="Email Address"
              />
            </Box>
            <Box maxWidth={maxWidth}>
              <Field
                component={SubaccountTypeaheadWrapper}
                disabled={submitting}
                helpText="Leaving this field blank will add the suppressions to the master account."
                name="subaccount"
              />
            </Box>
            <Checkbox.Group label="Type" required>
              <Field
                component={CheckboxWrapper}
                name="types.transactional"
                label="Transactional"
                type="checkbox"
              />
              <Field
                component={CheckboxWrapper}
                name="types.non_transactional"
                label="Non-Transactional"
                type="checkbox"
                validate={this.atLeastOne}
              />
            </Checkbox.Group>
            <Field name="description" component={TextFieldWrapper} label="Description" />
          </Stack>
          <ButtonWrapper>
            <Button variant="primary" disabled={pristine || submitting} type="submit">
              Add / Update
            </Button>
          </ButtonWrapper>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({
  initialValues: {
    types: {
      non_transactional: false,
      transactional: false,
    },
  },
});

export default withRouter(
  connect(mapStateToProps, { showAlert, createOrUpdateSuppressions, reset })(
    reduxForm({ form: FORM_NAME })(AddForm),
  ),
);

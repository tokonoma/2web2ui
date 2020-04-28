import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Box, Button, Panel, Stack } from 'src/components/matchbox';
import { ButtonWrapper, TextFieldWrapper } from 'src/components';
import { PageLink } from 'src/components/links';
import { required, domain } from 'src/helpers/validation';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import SubaccountForm from './SubaccountForm';

const FORM_NAME = 'createSendingDomain';
const FIELD_MAX_WIDTH = '860px';

export class CreateForm extends Component {
  render() {
    const { submitting, handleSubmit, hasSubaccounts } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Panel.Section>
          <Box maxWidth={FIELD_MAX_WIDTH}>
            <Stack>
              <p>
                We recommend using a subdomain e.g. <em>mail.mydomain.com</em>. Depending on how you
                want to use your domain, you may not be able to completely configure your DNS
                records if you use your organizational domain.
              </p>

              <Field
                component={TextFieldWrapper}
                label="Domain Name"
                placeholder="email.example.com"
                name="domain"
                validate={[required, domain]}
                disabled={submitting}
              />

              {hasSubaccounts && <SubaccountForm formName={FORM_NAME} />}
            </Stack>
          </Box>
        </Panel.Section>

        <Panel.Section>
          <ButtonWrapper marginTop="0">
            <Button variant="primary" submit disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add a Domain'}
            </Button>

            <PageLink
              as={Button}
              to="/account/sending-domains"
              variant="secondary"
              disabled={submitting}
            >
              Cancel
            </PageLink>
          </ButtonWrapper>
        </Panel.Section>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  hasSubaccounts: hasSubaccounts(state),
  initialValues: {
    assignTo: 'master',
  },
});

const formOptions = { form: FORM_NAME };
export default connect(mapStateToProps, {})(reduxForm(formOptions)(CreateForm));

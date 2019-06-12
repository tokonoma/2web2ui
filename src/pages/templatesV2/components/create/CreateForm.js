import React, { Component } from 'react';
import { autofill, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
// Components
import { Grid } from '@sparkpost/matchbox';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import FromEmailWrapper from '../FromEmailWrapper';
// Helpers & Validation
import config from 'src/config';
import { required, slug } from 'src/helpers/validation';
import { slugify } from 'src/helpers/string';
import { emailOrSubstitution } from '../validation';
import { isSubaccountUser } from 'src/helpers/conditions/user';
import { selectCondition } from 'src/selectors/accessConditionState';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { not } from 'src/helpers/conditions';
import { selectDomainsBySubaccountWithDefault } from 'src/selectors/templates';

export class CreateForm extends Component {
  // Fills in ID based on Name
  handleIdFill = (e) => {
    const { autofill, formName } = this.props;
    autofill(formName, 'id', slugify(e.target.value));
  };

  fromEmailHelpText() {
    const { domains, domainsLoading, subaccountId, fromEmail } = this.props;

    if (domainsLoading) {
      return null;
    }

    if (fromEmail && fromEmail.split('@')[1] === config.sandbox.domain) {
      return 'You are using sandbox domain which has certain restrictions!';
    }

    if (!domains.length) {
      return subaccountId
        ? 'The selected subaccount does not have any verified sending domains.'
        : 'You do not have any verified sending domains to use.';
    }

    return null;
  }

  render() {
    const { domains, hasSubaccounts, canViewSubaccount } = this.props;

    const canViewSubaccountSection = hasSubaccounts && canViewSubaccount;
    return (
      <Grid>
        <Grid.Column xs={12} lg={7}>
          <Field
            name='name'
            component={TextFieldWrapper}
            label='Template Name'
            onChange={this.handleIdFill}
            validate={required}
          />

          <Field
            name='id'
            component={TextFieldWrapper}
            label='Template ID'
            helpText={'A Unique ID for your template, we\'ll fill this in for you.'}
            validate={[required, slug]}
          />
          <Field
            name='content.subject'
            component={TextFieldWrapper}
            label='Subject'
            validate={required}
          />

          <Field
            name='content.from.email'
            component={FromEmailWrapper}
            placeholder='example@email.com'
            label='From Email'
            validate={[required, emailOrSubstitution]}
            domains={domains}
            helpText={this.fromEmailHelpText()}
          />
        </Grid.Column>
        <Grid.Column xs={12} lg={5}>
          {canViewSubaccountSection && <SubaccountSection newTemplate={true}/>}
        </Grid.Column>
      </Grid>
    );
  }
}

CreateForm.defaultProps = {
  domains: []
};


const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.formName);

  return {
    domains: selectDomainsBySubaccountWithDefault(state, props),
    fromEmail: selector(state, 'content.from.email'),
    domainsLoading: state.sendingDomains.listLoading,
    hasSubaccounts: hasSubaccounts(state),
    canViewSubaccount: selectCondition(not(isSubaccountUser))(state)
  };
};

const connectedForm = connect(mapStateToProps, { autofill })(CreateForm);
connectedForm.displayName = 'TemplateCreateForm';
export default connectedForm;


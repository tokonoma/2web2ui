import React from 'react';
import EditorContext from '../../context/EditorContext';
import SettingsForm from './Form';
import { isSubaccountUser } from 'src/helpers/conditions/user';
import { selectCondition } from 'src/selectors/accessConditionState';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { not } from 'src/helpers/conditions';
import { selectDomainsBySubaccount } from 'src/selectors/templates';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { update as updateTemplate } from 'src/actions/templates';
import { reduxForm } from 'redux-form';
import { showAlert } from 'src/actions/globalAlert';
import { selectSubaccountFromQuery } from '../../../../selectors/subaccounts';

const formName = 'templateSettings';

const mapStateToProps = (state, props) => ({
  domains: selectDomainsBySubaccount(state, props),
  domainsLoading: state.sendingDomains.listLoading,
  hasSubaccounts: hasSubaccounts(state),
  canViewSubaccount: selectCondition(not(isSubaccountUser))(state),
  initialValues: {
    ...props.draft,
    subaccount: selectSubaccountFromQuery(state, props)
  }
});

const formOptions = {
  form: formName,
  enableReinitialize: true // required to update initial values from redux state
};

const ConnectedSettingsForm = withRouter(connect(mapStateToProps, {
  updateTemplate,
  showAlert
})(reduxForm(formOptions)(SettingsForm)));


const FormContainer = (props) => (
  <EditorContext.Consumer>
    {(value) => <ConnectedSettingsForm {...value} {...props} />}
  </EditorContext.Consumer>
);

export default FormContainer;

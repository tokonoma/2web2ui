import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import { showAlert } from 'src/actions/globalAlert';
import { clearSnippet, getSnippet, updateSnippet } from 'src/actions/snippets';
import { hasGrants, not } from 'src/helpers/conditions';
import { isSubaccountUser } from 'src/helpers/conditions/user';
import { hasSubaccounts, selectSubaccountFromQuery } from 'src/selectors/subaccounts';
import { selectCondition } from 'src/selectors/accessConditionState';
import EditPage from './EditPage';

const formOptions = {
  form: 'editSnippetForm',
  enableReinitialize: true
};

const mapDispatchToProps = {
  clearSnippet,
  getSnippet,
  showAlert,
  updateSnippet
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { subaccount: subaccountId } = qs.parse(props.location.search);
  return {
    canModify: hasGrants('templates/modify')(state),
    hasSubaccounts: hasSubaccounts(state),
    canViewSubaccount: selectCondition(not(isSubaccountUser))(state),
    id,
    loading: state.snippets.getPending,
    loadingError: state.snippets.getError,
    subaccountId,
    initialValues: {
      ...state.snippets.item,
      subaccount_id: subaccountId, // remove once provided by state
      subaccount: selectSubaccountFromQuery(state, props) // for SubaccountSection
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(EditPage));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formValueSelector, reduxForm } from 'redux-form';
import _ from 'lodash';
// Actions
import { create, getDraft } from 'src/actions/templates';
import { showAlert } from 'src/actions/globalAlert';
import { list as listDomains } from 'src/actions/sendingDomains';

import CreatePage from './CreatePage';

const formName = 'templateCreate';
const selector = formValueSelector(formName);

const mapStateToProps = (state, props) => ({
  id: selector(state, 'id'),
  loading: state.templates.getDraftLoading,
  subaccountId: _.get(selector(state, 'subaccount'), 'id'),
  formName: formName,
  initialValues: {
    assignTo: 'master'
  }
});

const formOptions = {
  form: formName,
  enableReinitialize: true // required to update initial values from redux state
};

export default withRouter(connect(mapStateToProps, {
  create,
  getDraft,
  showAlert,
  listDomains
})(reduxForm(formOptions)(CreatePage)));

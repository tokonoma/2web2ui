import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';

// Actions
import { create, getDraft } from 'src/actions/templates';
import { showAlert } from 'src/actions/globalAlert';

import { selectDefaultTemplateOptions } from 'src/selectors/accessConditionState';
import { selectAndCloneDraftById, selectDefaultTestData } from 'src/selectors/templates';

import CreatePage from './CreatePage';

const FORM_NAME = 'templateCreate';

const selector = formValueSelector(FORM_NAME);

const mapStateToProps = (state, props) => ({
  id: selector(state, 'id'),
  loading: state.templates.getDraftLoading,
  cloneId: props.match.params.id, // ID of the template it's cloning from
  subaccountId: _.get(selector(state, 'subaccount'), 'id'),
  formName: FORM_NAME,
  initialValues: {
    assignTo: 'master',
    options: selectDefaultTemplateOptions(state),
    testData: selectDefaultTestData(),
    ...selectAndCloneDraftById(state, props.match.params.id)
  }
});

const formOptions = {
  form: FORM_NAME,
  enableReinitialize: true // required to update initial values from redux state
};

export default withRouter(connect(mapStateToProps, { create, getDraft, showAlert })(reduxForm(formOptions)(CreatePage)));

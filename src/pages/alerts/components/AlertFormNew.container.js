import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { DEFAULT_FORM_VALUES, FORM_NAME } from '../constants/formConstants';
import validateForm from '../helpers/validateForm';

export default function withAlertForm(WrappedComponent) {

  const mapStateToProps = (state) => {
    const selector = formValueSelector(FORM_NAME);

    return {
      metric: selector(state, 'metric'),
      single_filter: selector(state, 'single_filter'),
      muted: selector(state, 'muted'),
      initialValues: DEFAULT_FORM_VALUES
    };
  };

  const formOptions = {
    form: FORM_NAME,
    enableReinitialize: true,
    validate: validateForm
  };

  return withRouter(connect(mapStateToProps)(reduxForm(formOptions)(WrappedComponent)));
}

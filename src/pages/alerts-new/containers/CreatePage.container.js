import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createAlert, deleteAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsCreate(WrappedComponent) {
  const mapDispatchToProps = { createAlert, deleteAlert, showAlert };

  const mapStateToProps = (state, props) => ({
    error: state.alerts.createError,
    loading: state.alerts.createPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsCreate;

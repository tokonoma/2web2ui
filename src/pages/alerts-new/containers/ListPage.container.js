import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createAlert, deleteAlert, listAlerts, setEnabledStatus, updateAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsList(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, createAlert, listAlerts, setEnabledStatus, showAlert, updateAlert };

  const mapStateToProps = (state, props) => ({
    alerts: state.alerts.list,
    error: state.alerts.listError,
    loading: state.alerts.listPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsList;

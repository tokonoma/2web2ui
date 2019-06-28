import { connect } from 'react-redux';
import { createAlert } from 'src/actions/alertsV1';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsCreate(WrappedComponent) {
  const mapDispatchToProps = { createAlert, showUIAlert: showAlert };

  const mapStateToProps = (state) => ({
    error: state.alertsV1.createError,
    loading: state.alertsV1.createPending,
    deletePending: state.alertsV1.deletePending
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withAlertsCreate;

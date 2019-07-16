import { connect } from 'react-redux';
import { updateAlert, getAlert } from 'src/actions/alertsV1';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsUpdate(WrappedComponent) {
  const mapDispatchToProps = { updateAlert, showUIAlert: showAlert, getAlert };

  const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    getError: state.alertsV1.getError,
    getLoading: state.alertsV1.getPending,
    alert: state.alertsV1.alert || {},
    loading: state.alertsV1.updatePending
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withAlertsUpdate;

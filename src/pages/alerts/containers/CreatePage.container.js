import { connect } from 'react-redux';
import { createAlert, getAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsCreate(WrappedComponent) {
  const mapDispatchToProps = { createAlert, showUIAlert: showAlert, getAlert };

  const mapStateToProps = (state, props) => ({
    idToDuplicate: props.match.params.id, // ID of the alert it's duplicating from
    getError: state.alertsV1.getError,
    getLoading: state.alertsV1.getPending,
    loading: state.alertsV1.createPending
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withAlertsCreate;

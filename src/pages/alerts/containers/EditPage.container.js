import { connect } from 'react-redux';
import { updateAlert, getAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsUpdate(WrappedComponent) {
  const mapDispatchToProps = { updateAlert, showUIAlert: showAlert, getAlert };

  const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    getError: state.alerts.getError,
    getLoading: state.alerts.getPending,
    loading: state.alerts.updatePending
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withAlertsUpdate;

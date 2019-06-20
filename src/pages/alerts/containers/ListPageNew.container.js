import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, listAlerts } from 'src/actions/alertsV1';
import { selectAlertsList, selectRecentlyTriggeredAlerts } from 'src/selectors/alertsV1';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsList(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, listAlerts, showAlert };

  const mapStateToProps = (state, props) => ({
    alerts: selectAlertsList(state),
    recentlyTriggeredAlerts: selectRecentlyTriggeredAlerts(state),
    error: state.alertsV1.listError,
    loading: state.alertsV1.listPending,
    deletePending: state.alertsV1.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsList;

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, listAlerts } from 'src/actions/alerts';
import { selectAlertsList, selectRecentlyTriggeredAlerts } from 'src/selectors/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsList(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, listAlerts, showAlert };

  const mapStateToProps = (state, props) => ({
    alerts: selectAlertsList(state),
    recentlyTriggeredAlerts: selectRecentlyTriggeredAlerts(state),
    error: state.alerts.listError,
    loading: state.alerts.listPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsList;

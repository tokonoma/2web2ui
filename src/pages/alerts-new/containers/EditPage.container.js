import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAlert, updateAlert } from 'src/actions/alerts';

function withAlertsEdit(WrappedComponent) {
  const mapDispatchToProps = { getAlert, updateAlert };

  const mapStateToProps = (state, props) => ({
    alerts: state.alerts.get,
    error: state.alerts.getError,
    loading: state.alerts.getPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsEdit;

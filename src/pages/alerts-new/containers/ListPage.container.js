import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, listAlerts } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsList(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, listAlerts, showAlert };

  const mapStateToProps = (state, props) => ({
    alerts: state.alerts.list,
    error: state.alerts.listError
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsList;

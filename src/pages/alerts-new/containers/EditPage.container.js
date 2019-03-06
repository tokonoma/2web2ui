import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAlert, updateAlert, deleteAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsEdit(WrappedComponent) {
  const mapDispatchToProps = { getAlert, updateAlert, deleteAlert, showAlert };

  const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    alert: state.alerts.alert,
    error: state.alerts.getError,
    loading: state.alerts.getPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsEdit;

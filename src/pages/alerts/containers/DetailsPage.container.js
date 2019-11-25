import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, getAlert, getIncidents } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';
import { getSubaccounts, hasSubaccounts } from 'src/selectors/subaccounts';
import { list as listSubaccounts } from 'src/actions/subaccounts';


function withAlert(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, getAlert, showUIAlert: showAlert, listSubaccounts, getIncidents };

  const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    alert: state.alerts.alert,
    incidents: state.alerts.alertIncidents,
    error: state.alerts.getError,
    loading: state.alerts.getPending,
    deletePending: state.alerts.deletePending,
    hasSubaccounts: hasSubaccounts(state),
    subaccounts: getSubaccounts(state) || []
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlert;

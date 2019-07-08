import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, getAlert } from 'src/actions/alertsV1';
import { showAlert } from 'src/actions/globalAlert';
import { getSubaccounts, hasSubaccounts } from 'src/selectors/subaccounts';
import { list as listSubaccounts } from 'src/actions/subaccounts';


function withAlert(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, getAlert, showUIAlert: showAlert, listSubaccounts };

  const mapStateToProps = (state) => ({
    alert: state.alertsV1.alert,
    error: state.alertsV1.getError,
    loading: state.alertsV1.getPending,
    deletePending: state.alertsV1.deletePending,
    hasSubaccounts: hasSubaccounts(state),
    subaccounts: getSubaccounts(state) || []
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlert;

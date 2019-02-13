import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listAlerts, updateAlert } from 'src/actions/alerts';

function withEditPage(WrappedComponent) {
  const mapDispatchToProps = { listAlerts, updateAlert };

  const mapStateToProps = (state, props) => ({
    // alert: state.alerts.list
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withEditPage;

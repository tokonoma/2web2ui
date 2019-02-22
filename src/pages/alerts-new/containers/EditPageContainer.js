import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAlert, updateAlert } from 'src/actions/alerts';

function withEditPage(WrappedComponent) {
  const mapDispatchToProps = { getAlert, updateAlert };

  const mapStateToProps = (state, props) => ({
    alert: state.alert.payload
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withEditPage;

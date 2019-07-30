import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listTests } from 'src/actions/inboxPlacement';
import { selectTestList } from 'src/selectors/inboxPlacement';

function withTestList(WrappedComponent) {
  const mapDispatchToProps = { listTests };

  const mapStateToProps = (state, props) => ({
    tests: selectTestList(state),
    error: state.inboxPlacement.test.listError,
    loading: state.inboxPlacement.test.listPending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withTestList;

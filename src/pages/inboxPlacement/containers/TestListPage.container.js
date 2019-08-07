import { connect } from 'react-redux';
import { listTests } from 'src/actions/inboxPlacement';
import { selectTestList } from 'src/selectors/inboxPlacement';
import { withRouter } from 'react-router-dom';

function withTestList(WrappedComponent) {
  const mapDispatchToProps = { listTests };

  const mapStateToProps = (state, props) => ({
    tests: selectTestList(state),
    error: state.inboxPlacement.testsError,
    loading: state.inboxPlacement.testsPending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withTestList;

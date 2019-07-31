import { connect } from 'react-redux';
import { listTests } from 'src/actions/inboxPlacement';
import { selectTestList } from 'src/selectors/inboxPlacement';

function withTestList(WrappedComponent) {
  const mapDispatchToProps = { listTests };

  const mapStateToProps = (state, props) => ({
    tests: selectTestList(state),
    error: state.inboxPlacement.testsError,
    loading: state.inboxPlacement.testsPending
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withTestList;

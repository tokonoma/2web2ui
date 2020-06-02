import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectTargetBanner } from 'src/selectors/globalBanner';
import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { showAlert } from 'src/actions/globalAlert';
import GlobalBanner from './GlobalBanner';

const mapStateToProps = (state, props) => {
  return {
    location: state.location,
    account: state.account,
    targetBanner: selectTargetBanner(state, props),
  };
};

const mapDispatchToProps = {
  fetchAccount,
  renewAccount,
  showAlert,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalBanner));

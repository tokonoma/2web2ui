import React, { createContext, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const defaultContext = {
  open: true
};

const ALWAYS_SHOW_ON_PATH = [
  '/account/billing',
  '/account/settings'
];

export const BannerContext = createContext(defaultContext);

export class GlobalBanner extends Component {

  render() {
    const { account: { pending_cancellation }, location, showBanner } = this.props;

    const value = {
      bannerOpen: Boolean(
        showBanner &&
        pending_cancellation && (
          //Within 7 days of cancellation
          moment.duration(moment(pending_cancellation.effective_date).diff(moment.utc(), 'days')) < 7 ||
          //Always show because of path
          ALWAYS_SHOW_ON_PATH.includes(location.pathname)
        )
      )
    };

    return (
      <BannerContext.Provider value={value}>
        {/* Only components that are rendered under this tree will be able to "consume" */}
        {this.props.children}
      </BannerContext.Provider>
    );
  }
}

const mapStateToProps = ({ account, globalAlert }) => ({
  account,
  showBanner: globalAlert.showBanner
});
export default withRouter(connect(mapStateToProps)(GlobalBanner));

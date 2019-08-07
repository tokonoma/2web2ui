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
    const { account, location, showBanner } = this.props;
    const { pending_cancellation } = account;

    const showBannerFromPath = !(
      (pending_cancellation && moment.duration(moment.utc().diff(pending_cancellation.effective_date)).asDays() > 7) && //Checks if within date
      !ALWAYS_SHOW_ON_PATH.includes(location.pathName)
    );

    const value = {
      bannerOpen: showBanner && //Banner state open
        pending_cancellation && showBannerFromPath
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

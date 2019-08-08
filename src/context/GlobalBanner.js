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
      (pending_cancellation && moment.duration(moment(pending_cancellation.effective_date).diff(moment.utc())).asDays() > 7) && //Checks if outside date
      !ALWAYS_SHOW_ON_PATH.includes(location.pathname) //Hide from the rest of the paths if outside dateRange
    );

    const value = {
      bannerOpen: Boolean(showBanner && //Banner state open
        pending_cancellation && showBannerFromPath)
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

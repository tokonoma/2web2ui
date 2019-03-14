import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import _ from 'lodash';

import { fetch as fetchAccount } from 'src/actions/account';
import { checkSuppression } from 'src/actions/suppressions';
import { list as listSendingDomains } from 'src/actions/sendingDomains';
import { listApiKeys } from 'src/actions/api-keys';

import { selectAccountAgeInWeeks , selectAccountAgeInDays } from 'src/selectors/accountAge';
import { selectVerifiedDomains, selectNotBlockedDomains } from 'src/selectors/sendingDomains';
import { selectApiKeysForSending } from 'src/selectors/api-keys';
import { hasGrants } from 'src/helpers/conditions';

function mapStateToProps(state) {
  const acctAgeWeeks = selectAccountAgeInWeeks(state);
  const acctAgeDays = selectAccountAgeInDays(state);
  const notBlockedDomains = selectNotBlockedDomains(state);
  const verifiedDomains = selectVerifiedDomains(state);
  const apiKeysForSending = selectApiKeysForSending(state);

  return {
    account: state.account,
    currentUser: state.currentUser,
    accountAgeInWeeks: acctAgeWeeks,
    accountAgeInDays: acctAgeDays,
    hasSuppressions: state.suppressions.hasSuppression,
    hasSendingDomains: notBlockedDomains.length > 0,
    hasVerifiedDomains: verifiedDomains.length > 0,
    hasApiKeysForSending: apiKeysForSending.length > 0,
    hasSentThisMonth: _.get(state, 'account.usage.month.used', 0) > 0,
    canViewTutorialAndSuppressions: hasGrants('api_keys/manage', 'templates/modify', 'sending_domains/manage')(state)
  };
}

export default withRouter(connect(mapStateToProps, { fetchAccount, checkSuppression, listSendingDomains, listApiKeys })(DashboardPage));

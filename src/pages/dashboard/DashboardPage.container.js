import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';
import _ from 'lodash';

import { fetch as fetchAccount, setAccountOption } from 'src/actions/account';
import { list as listSendingDomains } from 'src/actions/sendingDomains';
import { listApiKeys } from 'src/actions/api-keys';

import { getAccountUiOptionValue } from 'src/helpers/conditions/account';
import hasGrants from 'src/helpers/conditions/hasGrants';
import { isAdmin } from 'src/helpers/conditions/user';

import { selectAccountAgeInDays } from 'src/selectors/accountAge';
import { selectVerifiedDomains, selectNotBlockedDomains } from 'src/selectors/sendingDomains';
import { selectApiKeysForSending } from 'src/selectors/api-keys';

function mapStateToProps(state) {
  const accountAgeInDays = selectAccountAgeInDays(state);
  const notBlockedDomains = selectNotBlockedDomains(state);
  const verifiedDomains = selectVerifiedDomains(state);
  const apiKeysForSending = selectApiKeysForSending(state);

  return {
    account: state.account,
    accountAgeInDays,
    canManageKeys: hasGrants('api_keys/manage')(state),
    canManageSendingDomains: hasGrants('sending_domains/manage')(state),
    currentUser: state.currentUser,
    hasSendingDomains: notBlockedDomains.length > 0,
    hasVerifiedDomains: verifiedDomains.length > 0,
    hasApiKeysForSending: apiKeysForSending.length > 0,
    hasSentThisMonth: _.get(state, 'account.usage.month.used', 0) > 0,
    onboarding: getAccountUiOptionValue('onboarding')(state),
    isAdmin: isAdmin(state),
  };
}

export default connect(mapStateToProps, {
  fetchAccount,
  listSendingDomains,
  listApiKeys,
  setAccountOption,
})(DashboardPage);

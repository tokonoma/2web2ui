export const userCookieConsentFlagSelector = state => !!state.currentUser.cookie_consent;

export const usernameSelector = state =>
  state.currentUser.username || state.tfa.username || state.auth.username;

export const subaccountReportingIdSelector = ({ currentUser = {} }) =>
  currentUser.access_level === 'subaccount_reporting' ? currentUser.subaccount_id : -1;

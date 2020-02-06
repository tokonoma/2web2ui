import { isSubaccountUser } from 'src/helpers/conditions/user';

export const userCookieConsentFlagSelector = state => !!state.currentUser.cookie_consent;

export const usernameSelector = state =>
  state.currentUser.username || state.tfa.username || state.auth.username;

export const subaccountReportingIdSelector = ({ currentUser = {} }) =>
  isSubaccountUser({ currentUser }) ? currentUser.subaccount_id : -1;

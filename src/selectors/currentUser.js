import { SUBACCOUNT_REPORTING_USER_ROLE } from 'src/constants';

export const userCookieConsentFlagSelector = (state) => !!state.currentUser.cookie_consent;

export const usernameSelector = (state) => state.currentUser.username || state.tfa.username || state.auth.username;

export const isSubaccountReportingUser = (state) => state.currentUser.access_level === SUBACCOUNT_REPORTING_USER_ROLE;

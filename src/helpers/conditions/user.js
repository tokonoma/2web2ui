import { any } from 'src/helpers/conditions';
import _ from 'lodash';
import { SUBACCOUNT_ROLES } from 'src/constants';

export const isHeroku = ({ currentUser }) => currentUser.access_level === 'heroku';

export const isAzure = ({ currentUser }) => currentUser.access_level === 'azure';

export const isSubaccountUser = ({ currentUser }) => SUBACCOUNT_ROLES.includes(currentUser.access_level);

export const hasRole = (role) => ({ currentUser }) => currentUser.access_level === role;

export const isSubaccountUser = ({ currentUser }) => SUBACCOUNT_ROLES.includes(currentUser.access_level);

export const isAdmin = any(hasRole('admin'), hasRole('superuser'));

export const isSso = ({ currentUser }) => currentUser.is_sso;

export const isEmailVerified = ({ currentUser }) => currentUser.email_verified;

export const isUserUiOptionSet = (option, defaultValue) => ({ currentUser }) => _.get(currentUser.options, `ui.${option}`, defaultValue);

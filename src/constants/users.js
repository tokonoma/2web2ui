export const ROLES = {
  ADMIN: 'admin',
  DEVELOPER: 'developer',
  TEMPLATES: 'email', //Email role renamed to templates. TODO: Update after API access_level changes
  REPORTING: 'reporting',
  SUBACCOUNT_REPORTING: 'subaccount_reporting',
  SUPERUSER: 'superuser'
};

export const ROLE_LABELS = {
  email: 'Templates',//Email role renamed to templates. TODO: Update after API access_level changes
  admin: 'Admin',
  developer: 'Developer',
  reporting: 'Reporting',
  subaccount_reporting: 'Reporting',
  superuser: 'Super User',
  heroku: 'Heroku'
};
export const SUBACCOUNT_ROLES = [ROLES.SUBACCOUNT_REPORTING];

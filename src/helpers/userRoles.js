import { ROLES } from 'src/constants';

export function formatRole(role) {
  switch (role) {
    case ROLES.SUBACCOUNT_REPORTING:
      return 'reporting';
    case 'email':
      return ROLES.TEMPLATES;
    default:
      return role;
  }
}

export function unformatRole(role) {
  switch (role) {
    case ROLES.TEMPLATES:
      return 'email';
    default:
      return role;
  }
}

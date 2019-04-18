import { ROLES } from 'src/constants';

export function formatRole(role) {
  switch (role) {
    case ROLES.SUBACCOUNT_REPORTING:
      return 'reporting';
    case ROLES.TEMPLATES:
      return 'templates';
    default:
      return role;
  }
}

import { ROLES } from 'src/constants';
import cases from 'jest-in-case';
import { formatRole } from '../userRoles';

describe('formatRole', () => {
  cases('it changes the value of role to the intended visible role', ({ name, result }) => {
    expect(formatRole(name)).toEqual(result);
  }, [
    { name: ROLES.EMAIL, result: 'templates' },
    { name: ROLES.SUBACCOUNT_REPORTING, result: 'reporting' },
    { name: 'other-role', result: 'other-role' }
  ]);
});

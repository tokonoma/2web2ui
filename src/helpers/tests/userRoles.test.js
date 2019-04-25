import { ROLES } from 'src/constants';
import cases from 'jest-in-case';
import { formatRole, unformatRole } from '../userRoles';

describe('formatRole', () => {
  cases('it changes the value of role to the intended visible role', ({ name, result }) => {
    expect(formatRole(name)).toEqual(result);
  }, [
    { name: 'email', result: 'templates' },
    { name: ROLES.SUBACCOUNT_REPORTING, result: 'reporting' },
    { name: 'other-role', result: 'other-role' }
  ]);
});

describe('unformatRole', () => {
  cases('it changes the value of role from visible role to API accepted role', ({ name, result }) => {
    expect(unformatRole(name)).toEqual(result);
  }, [
    { name: ROLES.TEMPLATES, result: 'email' },
    { name: 'other-role', result: 'other-role' }
  ]);
});

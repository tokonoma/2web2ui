import validateEmailList from '../validateEmailList';

test('all valid', () => {
  expect(validateEmailList('  email@ddress1.com  ,email@ddress1.com')).toEqual(undefined);
});

test('invalid, but at least one valid', () => {
  expect(validateEmailList('  emailaddress1.com  ,email@ddress2.com')).toEqual(
    'Must be a comma separated list of valid Email Addresses',
  );
});

test('invalid, none valid', () => {
  expect(validateEmailList('  emailaddress1.com')).toEqual(
    'Must enter at least one valid Email Addresses',
  );
});

test('empty', () => {
  expect(validateEmailList('')).toEqual(undefined);
});

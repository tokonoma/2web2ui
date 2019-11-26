import validateEmailList from '../validateEmailList';

test('all valid', () => {
  expect(validateEmailList('  email@ddress1.com  ,email@ddress1.com')).toEqual(undefined);
});

test('invalid, but at least one valid', () => {
  expect(validateEmailList('  emailaddress1.com  ,email@ddress2.com')).toEqual('Must be a comma separated list of valid Email Addresses');
});

test('invalid, none valid', () => {
  expect(validateEmailList('  emailaddress1.com')).toEqual('Must enter at least one valid Email Addresses');
});

test('that no more than 10 email addresses have been entered', () => {
  const tooManyEmails = [...Array(11).keys()].map((x) => `jane.doe${x}@gmail.com`).join(', '); //.map((x) => `jane.doe${x}@gmail.com`).join(',');
  expect(validateEmailList(tooManyEmails)).toEqual('Email Address list can only contain a maximum of 10 emails');
});

test('empty', () => {
  expect(validateEmailList('')).toEqual(undefined);
});

import getAssignTo from '../getAssignTo';

test('defaults to subaccount', () => {
  expect(getAssignTo()).toEqual('subaccount');
});

test('strings are parsed', () => {
  expect(getAssignTo('-1')).toEqual('all');
});

test('numbers work fine too', () => {
  expect(getAssignTo(0)).toEqual('master');
});

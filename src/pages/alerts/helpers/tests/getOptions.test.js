import getOptions from '../getOptions';

test('formats object into select options', () => {
  expect(getOptions({
    key1: 'key1 text',
    key2: 'key2 text',
    key3: 'key3 text'
  })).toEqual([
    {
      'label': 'key1 text',
      'value': 'key1'
    },{
      'label': 'key2 text',
      'value': 'key2'
    },{
      'label': 'key3 text',
      'value': 'key3'
    }]);
});

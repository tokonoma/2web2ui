import _ from 'lodash';

export default function getOptions(obj) {
  const optionsArray = [];
  _.forOwn(obj, (label, value) => optionsArray.push({ value, label }));
  return optionsArray;
}

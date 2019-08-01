export const toCollection = (obj) => (
  Object.keys(obj).reduce((acc, key) => [...acc, { ...obj[key], key }], [])
);

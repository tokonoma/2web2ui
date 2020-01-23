// Based on Java's hashcode function
// https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export const hash = str => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }

  for (let i = 0, l = str.length; i < l; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

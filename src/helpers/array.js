export const toSentence = (array) => {
  const conjunction = (array.length >= 3) ? ', and ' : ' and ';
  return array.slice(0, -2).join(', ') +
    (array.slice(0, -2).length ? ', ' : '') +
    (array.slice(-2).join(conjunction));
};

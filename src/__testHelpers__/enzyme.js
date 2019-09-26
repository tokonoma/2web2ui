export const findButton = (wrapper, buttonLabel) =>
  wrapper.findWhere(
    (node) => node.type() === 'button' && new RegExp(buttonLabel).test(node.text())
  );

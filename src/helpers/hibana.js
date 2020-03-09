import { omit } from '@styled-system/props';

export const omitSystemProps = (props, whitelistedProps = []) => {
  const newProps = omit(props);

  if (whitelistedProps.length) {
    [...whitelistedProps].forEach(prop => {
      if (props[prop] !== undefined) {
        newProps[prop] = props[prop];
      }
    });
  }

  return newProps;
};

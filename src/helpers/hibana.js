import { omit } from '@styled-system/props';

const PROPS_TO_PASS_THROUGH = ['color', 'size'];

export const omitSystemProps = props => {
  const newProps = omit(props);

  PROPS_TO_PASS_THROUGH.forEach(prop => {
    if (props[prop] !== undefined) {
      newProps[prop] = props[prop];
    }
  });

  return newProps;
};

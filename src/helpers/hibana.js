import { omit } from '@styled-system/props';
import _ from 'lodash';
export const omitSystemProps = (props, allowedProps = []) => {
  const newProps = omit(props);

  if (allowedProps.length) {
    [...allowedProps].forEach(prop => {
      if (props[prop] !== undefined) {
        newProps[prop] = props[prop];
      }
    });
  }

  return newProps;
};

export const omitDeprecatedProps = (props, deprecatedProps = []) => {
  return _.omit(props, deprecatedProps);
};

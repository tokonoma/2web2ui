import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';

function SubduedText(props) {
  const [state] = useHibana();
  const { as: Component } = props;
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? (
    <Text {...props} as={Component} />
  ) : (
    <Component className={props.className} data-id={props['data-id']}>
      {props.children}
    </Component>
  );
}

SubduedText.propTypes = {
  className: PropTypes.string,
  'data-id': PropTypes.string,
};

SubduedText.defaultProps = {
  color: 'gray.600',
  fontSize: '300',
  as: 'p',
};

export default SubduedText;

import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'src/components/matchbox';
import { Block } from '@sparkpost/matchbox-icons';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Box, Text } from 'src/components/matchbox';
import styles from './Empty.module.scss';

// TODO: This component should be composable and probably *never* ship with a <Panel/> baked in
function OGEmpty({ title, message, hasPanel }) {
  return (
    <WrappingComponent title={title} hasPanel={hasPanel}>
      <h6 className={styles.Center}>{message}</h6>
    </WrappingComponent>
  );
}
function HibanaEmpty({ title, message, hasPanel }) {
  return (
    <WrappingComponent title={title} hasPanel={hasPanel}>
      <Box textAlign="center" color="gray.700">
        <Block size={28} />
        <Text as="h3" color="gray.700">
          {message}
        </Text>
      </Box>
    </WrappingComponent>
  );
}

// Used to conditionally render a `<Panel/>`
function WrappingComponent(props) {
  const { children, hasPanel, title } = props;

  if (hasPanel) {
    return (
      <Panel sectioned title={title}>
        {children}
      </Panel>
    );
  }

  return <>{children}</>;
}

function Empty(props) {
  return useHibanaToggle(OGEmpty, HibanaEmpty)(props);
}

Empty.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
};

Empty.defaultProps = {
  hasPanel: true,
};

export default Empty;

import React from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { Box, Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/components/matchbox/useHibanaToggle';

const OGCard = ({ children, textAlign }) => (
  <div className={classNames(styles.CardContainer, styles[textAlign])}>{children}</div>
);

export const CardActions = ({ children }) => <>{children}</>;

const OGCardContent = ({ children }) => <div className={styles.CardContent}>{children}</div>;

const OGCardTitle = ({ children }) => (
  <div className={styles.CardTitle} role="heading" aria-level="3">
    {children}
  </div>
);

const HibanaCard = ({ children, textAlign }) => {
  return (
    <Box border="400" padding="400" textAlign={textAlign}>
      {children}
    </Box>
  );
};

const HibanaCardContent = ({ children }) => {
  return (
    <Box display="inline-block" fontSize="500">
      {children}
    </Box>
  );
};

const HibanaCardTitle = ({ children }) => {
  return (
    <Text as="h3" mb="100">
      {children}
    </Text>
  );
};

export const Card = ({ children, textAlign }) => {
  return useHibanaToggle(OGCard, HibanaCard)({ children, textAlign });
};

export const CardContent = ({ children }) => {
  return useHibanaToggle(OGCardContent, HibanaCardContent)({ children });
};

export const CardTitle = ({ children }) => {
  return useHibanaToggle(OGCardTitle, HibanaCardTitle)({ children });
};

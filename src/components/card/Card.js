import React from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { useHibana } from 'src/context/HibanaContext';
import { Box, Text } from 'src/components/matchbox';

export const Card = ({ children, textAlign }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled)
    return <div className={classNames(styles.CardContainer, styles[textAlign])}>{children}</div>;
  return (
    <Box border="400" padding="400" textAlign={textAlign}>
      {children}
    </Box>
  );
};

export const CardActions = ({ children }) => <>{children}</>;

export const CardContent = ({ children }) => <div className={styles.CardContent}>{children}</div>;

export const CardTitle = ({ children }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled)
    return (
      <div className={styles.CardTitle} role="heading" aria-level="3">
        {children}
      </div>
    );

  return (
    <Text as="h3" fontSize="400">
      {children}
    </Text>
  );
};

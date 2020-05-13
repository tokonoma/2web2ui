import React from 'react';
import classNames from 'classnames';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { Box } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import styles from './InlineItems.module.scss';

// todo, replace with Inline when it supports control over top space
const InlineItem = props => {
  const [{ isHibanaEnabled }] = useHibana();
  const children = React.Children.toArray(props.children);

  if (!isHibanaEnabled) {
    return (
      <div className={classNames(styles.Container, props.compact && styles.compact)}>
        {children.map((child, index) => (
          <div key={index} className={classNames(styles.Item, props.compact && styles.compact)}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Box
      marginLeft={`-${tokens.spacing_200}`}
      marginTop={props.compact ? 0 : `-${tokens.spacing_200}`}
    >
      {children.map((child, index) => (
        <Box
          key={index}
          display="inline-block"
          marginLeft={tokens.spacing_200}
          marginTop={props.compact ? 0 : tokens.spacing_200}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default InlineItem;

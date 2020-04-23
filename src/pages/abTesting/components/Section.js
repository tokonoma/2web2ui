import React from 'react';
import { Box, Grid, Text } from 'src/components/matchbox';
import { OGOnlyWrapper } from 'src/components/hibana';
import styles from './Section.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const Left = ({ children }) => (
  <OGOnlyWrapper as={Grid.Column} xs={12} lg={5}>
    <Box as={Grid.Column} xs={12} lg={3}>
      <div className={styles.Left}>{children}</div>
    </Box>
  </OGOnlyWrapper>
);

const Right = ({ children }) => (
  <OGOnlyWrapper as={Grid.Column} xs={12} lg={7}>
    <Box as={Grid.Column} xs={12} lg={9}>
      <div className={styles.Right}>{children}</div>
    </Box>
  </OGOnlyWrapper>
);

export function OGSection(props) {
  const { title, children } = props;

  return (
    <div className={styles.Section}>
      <hr className={styles.Hr} />
      <h3>{title}</h3>
      <Grid>{children}</Grid>
    </div>
  );
}

function HibanaSection(props) {
  const { title, children } = props;

  return (
    <div className={styles.Section}>
      <Text as="span" fontSize="400" fontWeight="600" role="heading" aria-level="3" mb="200">
        {title}
      </Text>
      <Grid>{children}</Grid>
    </div>
  );
}

function Section(props) {
  return useHibanaToggle(OGSection, HibanaSection)(props);
}
Section.Left = Left;
Section.Right = Right;

export default Section;

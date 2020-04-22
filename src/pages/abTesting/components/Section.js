import React from 'react';
import { Grid, Text } from 'src/components/matchbox';
import styles from './Section.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGLeft = ({ children }) => (
  <Grid.Column xs={12} lg={5}>
    <div className={styles.Left}>{children}</div>
  </Grid.Column>
);
const HibanaLeft = ({ children }) => (
  <Grid.Column xs={12} lg={3}>
    <div className={styles.Left}>{children}</div>
  </Grid.Column>
);
const Left = props => useHibanaToggle(OGLeft, HibanaLeft)(props);

const OGRight = ({ children }) => (
  <Grid.Column xs={12} lg={7}>
    <div className={styles.Right}>{children}</div>
  </Grid.Column>
);

const HibanaRight = ({ children }) => (
  <Grid.Column xs={12} lg={9}>
    <div className={styles.Right}>{children}</div>
  </Grid.Column>
);

const Right = props => useHibanaToggle(OGRight, HibanaRight)(props);

function OGSection(props) {
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
      <Text as="h3" fontSize="400">
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

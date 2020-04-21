import React from 'react';
import { Grid } from 'src/components/matchbox';
import styles from './Section.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const Left = ({ children }) => (
  <Grid.Column xs={12} lg={5}>
    <div className={styles.Left}>{children}</div>
  </Grid.Column>
);
const Right = ({ children }) => (
  <Grid.Column xs={12} lg={7}>
    <div className={styles.Right}>{children}</div>
  </Grid.Column>
);

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
      <h3>{title}</h3>
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

import React from 'react';
import { Grid, Text } from 'src/components/matchbox';
import styles from './Section.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export const OGLeft = ({ children }) => (
  <Grid.Column xs={12} lg={5}>
    <div className={styles.Left}>{children}</div>
  </Grid.Column>
);
const HibanaLeft = ({ children }) => (
  <Grid.Column xs={12} lg={3}>
    <div className={styles.Left}>{children}</div>
  </Grid.Column>
);

export const OGRight = ({ children }) => (
  <Grid.Column xs={12} lg={7}>
    <div className={styles.Right}>{children}</div>
  </Grid.Column>
);

const HibanaRight = ({ children }) => (
  <Grid.Column xs={12} lg={9}>
    <div className={styles.Right}>{children}</div>
  </Grid.Column>
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

OGSection.Left = OGLeft;
OGSection.Right = OGRight;
OGSection.Left.displayName = 'Left';
OGSection.Right.displayName = 'Right';

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

HibanaSection.Left = HibanaLeft;
HibanaSection.Right = HibanaRight;
HibanaSection.Left.displayName = 'Left';
HibanaSection.Right.displayName = 'Right';

function Section(props) {
  return useHibanaToggle(OGSection, HibanaSection)(props);
}

export default Section;

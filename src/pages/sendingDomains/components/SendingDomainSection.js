import React, { Component } from 'react';
import { Grid } from 'src/components/matchbox';
import { Heading } from 'src/components';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { useHibana } from 'src/context/HibanaContext';
import OGStyles from './SendingDomainSection.module.scss';
import hibanaStyles from './SendingDomainsSectionHibana.module.scss';

const Left = ({ children }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Grid.Column xs={12} lg={5}>
      <div className={styles.Left}>{children}</div>
    </Grid.Column>
  );
};

const Right = ({ children }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Grid.Column xs={12} lg={7}>
      <div className={styles.Right}>{children}</div>
    </Grid.Column>
  );
};

const Section = ({ title, children }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <div
      className={styles.SendingDomainSection}
      data-id={`sending-domain-${title.toLowerCase().replace(/\s/g, '-')}`}
    >
      {!isHibanaEnabled && <hr className={styles.Hr} />}
      <Heading as="h2" looksLike="h4">
        {title}
      </Heading>
      <Grid>{children}</Grid>
    </div>
  );
};

export class SendingDomainSection extends Component {
  static Left = Left;
  static Right = Right;

  render() {
    return <Section {...this.props} />;
  }
}

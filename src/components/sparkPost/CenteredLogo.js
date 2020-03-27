import React from 'react';
import SparkPost from './SparkPost';
import { UnstyledLink } from 'src/components/matchbox';
import { LINKS } from 'src/constants';
import styles from './CenteredLogo.module.scss';
import PartnerLogos from './partners/PartnerLogos';

const CenteredLogo = ({ showAwsLogo }) => (
  <div className={styles.CenteredLogo}>
    {/* note, ExternalLink should be used instead of PageLink because the logo is linking to a
          different domain, our corp website, however, ExternalLink doesn't look good with the
          warning icon */}
    <UnstyledLink to={LINKS.SP_HOME_PAGE} title="SparkPost">
      <SparkPost.Logo />
    </UnstyledLink>

    {showAwsLogo && <PartnerLogos.AwsMP height={37} width={222} />}
  </div>
);

export default CenteredLogo;

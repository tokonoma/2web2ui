import React from 'react';
import SparkPost from './SparkPost';
import { Box, UnstyledLink } from 'src/components/matchbox';
import { LINKS } from 'src/constants';
import styles from './CenteredLogo.module.scss';
import PartnerLogos from './partners/PartnerLogos';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGCenteredLogo = ({ showAwsLogo }) => (
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

const HibanaCenteredLogo = ({ showAwsLogo }) => (
  <Box textAlign="center" marginBottom="400">
    {/* note, ExternalLink should be used instead of PageLink because the logo is linking to a
          different domain, our corp website, however, ExternalLink doesn't look good with the
          warning icon */}
    <UnstyledLink to={LINKS.SP_HOME_PAGE} title="SparkPost">
      <SparkPost.Logo />
    </UnstyledLink>

    {showAwsLogo && <PartnerLogos.AwsMP height={37} width={222} />}
  </Box>
);
const CenteredLogo = props => useHibanaToggle(OGCenteredLogo, HibanaCenteredLogo)(props);
export default CenteredLogo;

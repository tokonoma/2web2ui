import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './Divider.module.scss';
import hibanaStyles from './DividerHibana.module.scss';

function Divider() {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return <hr className={styles.Divider} />;
}

export default Divider;

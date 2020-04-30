import React from 'react';

import styles from './ButtonWrapper.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Box, Inline } from 'src/components/matchbox';

function OGButtonWrapper({ children, marginTop }) {
  return (
    <div className={styles.ButtonWrapper} style={{ marginTop }}>
      {children}
    </div>
  );
}

function HibanaButtonWrapper({ children, marginTop }) {
  return (
    <Box marginTop={marginTop ? marginTop : '500'}>
      <Inline>{children}</Inline>
    </Box>
  );
}

export default function ButtonWrapper(props) {
  return useHibanaToggle(OGButtonWrapper, HibanaButtonWrapper)(props);
}

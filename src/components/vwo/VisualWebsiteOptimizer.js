import React from 'react';
import { Helmet } from 'react-helmet';
import getConfig from 'src/helpers/getConfig';

export default () => {
  const enabled = getConfig('vwo.enabled') || false;
  if (enabled) {
    return (
      <Helmet>
        <script src="https://dev.visualwebsiteoptimizer.com/lib/461565.js"></script>
      </Helmet>
    );
  }

  return null;
};

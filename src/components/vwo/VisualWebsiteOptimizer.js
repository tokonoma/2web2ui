import React from 'react';
import { Helmet } from 'react-helmet';
import config from 'src/config';

export default () => {
  const { vwo: { enabled = false } = {} } = config;
  if (enabled) {
    return (
      <Helmet>
        <script src="https://dev.visualwebsiteoptimizer.com/lib/461565.js"></script>
      </Helmet>
    );
  }

  return null;
};

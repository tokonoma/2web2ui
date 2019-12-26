import React from 'react';
import { Banner } from '@sparkpost/matchbox';

export default () => (
  <Banner title="Congratulations! You are not currently on a Blacklist" status="success">
    <span>There are no incidents reported for items on your watchlist</span>
  </Banner>
);

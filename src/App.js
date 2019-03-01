import React from 'react';
import { AuthenticationGate, SuspensionAlerts } from 'src/components/auth';
import { CookieConsent, GlobalAlertWrapper, BoomerangBanner, SiftScience } from 'src/components';
import Poll from 'src/context/Poll';
import Support from 'src/components/support/Support';
import GoogleTagManager from 'src/components/googleTagManager/GoogleTagManager';
import Pendo from 'src/components/pendo/Pendo';
import Layout from 'src/components/layout/Layout';
import ErrorBoundary from 'src/components/errorBoundaries/ErrorBoundary';
import AppRoutes from 'src/AppRoutes';

import config from 'src/config';

import { BrowserRouter as Router } from 'react-router-dom';

const reloadApp = () => {
  window.location.reload(true);
};

const App = () => (
  <ErrorBoundary onCtaClick={reloadApp} ctaLabel='Reload Page'>
    <Poll>
      <Router>
        <div>
          {config.siftScience && <SiftScience config={config.siftScience} />}
          <BoomerangBanner />
          {config.gtmId && <GoogleTagManager id={config.gtmId} />}
          <Pendo />
          <AuthenticationGate />
          <SuspensionAlerts />
          <CookieConsent />
          <Layout>
            <AppRoutes />
          </Layout>
          <Support />
          <GlobalAlertWrapper />
        </div>
      </Router>
    </Poll>
  </ErrorBoundary>
);

export default App;

import React from 'react';
import { AuthenticationGate, SuspensionAlerts } from 'src/components/auth';
import { CookieConsent, GlobalAlertWrapper, BoomerangBanner, SiftScience } from 'src/components';
import VisualWebsiteOptimizer from './components/vwo/VisualWebsiteOptimizer';
import Segment from './components/segment/Segment';
import Support from 'src/components/support/Support';
import GoogleTagManager from 'src/components/googleTagManager/GoogleTagManager';
import Pendo from 'src/components/pendo/Pendo';
import Layout from 'src/components/layout/Layout';
import AppRoutes from 'src/components/appRoutes';
import { HibanaBanner, HibanaToggle, HibanaDescription } from 'src/components/hibana';
import GlobalBanner from 'src/context/GlobalBanner';

import config from 'src/config';

import { BrowserRouter } from 'react-router-dom';

const App = ({ RouterComponent = BrowserRouter }) => (
  <RouterComponent>
    <div>
      {config.siftScience && <SiftScience config={config.siftScience} />}
      <BoomerangBanner />
      {config.gtmId && <GoogleTagManager id={config.gtmId} />}
      <Pendo />
      <VisualWebsiteOptimizer />
      <Segment />
      <AuthenticationGate />
      <SuspensionAlerts />
      <CookieConsent />
      <GlobalBanner>
        <Layout>
          <AppRoutes />
        </Layout>
      </GlobalBanner>
      <Support />
      <GlobalAlertWrapper />

      <HibanaBanner>
        <HibanaDescription />
        <HibanaToggle />
      </HibanaBanner>
    </div>
  </RouterComponent>
);

export default App;

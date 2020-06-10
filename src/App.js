import React from 'react';
import { AuthenticationGate, SuspensionAlerts } from 'src/components/auth';
import { CookieConsent, GlobalAlertWrapper } from 'src/components';
import Support from 'src/components/support/Support';
import Layout from 'src/components/layout/Layout';
import AppRoutes from 'src/components/appRoutes';
import { HibanaBanner } from 'src/components/hibana';
import GlobalBanner from 'src/context/GlobalBanner';
import { RouterContextProvider } from 'src/context/RouterContext';
import Timestream from './Timestream';

import { BrowserRouter } from 'react-router-dom';

const App = ({ RouterComponent = BrowserRouter }) => (
  <RouterComponent>
    <RouterContextProvider>
      <div>
        <Timestream />
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
        <HibanaBanner />
      </div>
    </RouterContextProvider>
  </RouterComponent>
);

export default App;

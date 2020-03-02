import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import findRouteByPath from 'src/helpers/findRouteByPath';
import { Helmet } from 'react-helmet';
import { HibanaBanner, HibanaToggle, HibanaDescription } from 'src/components/hibana';

/**
 * Returns layout component from routes config
 */
export const Layout = ({ children, location }) => {
  const route = findRouteByPath(location.pathname);
  const LayoutComponent = route.layout || Form;

  return (
    <LayoutComponent>
      {route.title && (
        <>
          {/* `defer` solves issue with <title> not updating when a new tab is opened: https://github.com/nfl/react-helmet/issues/315 */}
          <Helmet defer={false}>
            <title>{route.title} | SparkPost</title>
          </Helmet>
        </>
      )}

      {children}

      <HibanaBanner>
        <HibanaDescription />
        <HibanaToggle />
      </HibanaBanner>
    </LayoutComponent>
  );
};

export default withRouter(Layout);

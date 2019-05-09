import React, { createContext, useMemo } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';

const RouteContext = createContext();

export const ProviderComponent = ({ children, ...routerProps }) => {
  const value = useMemo(() => ({
    ...routerProps,
    params: { // merge path and querystring params together
      ...qs.parse(routerProps.location.search, { ignoreQueryPrefix: true }),
      ...routerProps.match.params
    }
  }), [routerProps]);

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};

export const RouteContextProvider = withRouter(ProviderComponent);
export default RouteContext;

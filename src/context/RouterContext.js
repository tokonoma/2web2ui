import React, { createContext, useMemo } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';

// see, https://github.com/ReactTraining/react-router/issues/6430
// note, maintainers do not recommend using __RouterContext from react-router
const RouterContext = createContext();

export const ProviderComponent = ({ children, ...routerProps }) => {
  const value = useMemo(() => ({
    ...routerProps,
    requestParams: { // merge path and querystring params together
      ...qs.parse(routerProps.location.search, { ignoreQueryPrefix: true }),
      ...routerProps.match.params
    }
  }), [routerProps]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export const RouterContextProvider = withRouter(ProviderComponent);
export default RouterContext;

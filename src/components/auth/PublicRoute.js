import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'src/actions/auth';
import { Route } from 'react-router-dom';
import AccessControl from './AccessControl';
import { AUTH_ROUTE } from 'src/constants';
import { RouterContextProvider } from 'src/context/RouterContext';

export const PublicRoute = ({
  component: Component,
  condition,
  forceLogout,
  loggedIn,
  logout,
  ...routeProps
}) => {
  const [pendingLogout, setPendingLogout] = React.useState(forceLogout);

  // heavily relies on AuthenticationGate to call login if not logout will do nothing
  React.useEffect(() => {
    if (forceLogout) {
      logout();
    }
  }, [forceLogout, logout]);

  React.useEffect(() => {
    if (forceLogout && pendingLogout && !loggedIn) {
      setPendingLogout(false);
    }
  }, [forceLogout, loggedIn, pendingLogout]);

  if (pendingLogout) {
    return null;
  }

  return (
    <Route
      {...routeProps}
      render={reactRouterProps => (
        <AccessControl condition={condition} redirect={AUTH_ROUTE} wait={false}>
          <RouterContextProvider>
            <Component {...routeProps} {...reactRouterProps} />
          </RouterContextProvider>
        </AccessControl>
      )}
    />
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logout })(PublicRoute);

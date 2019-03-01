import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { PublicRoute, ProtectedRoute } from 'src/components/auth';
import routes from 'src/config/routes';

export default () => (
  <Switch>
    {routes.map((route) => {
      const MyRoute = route.public ? PublicRoute : ProtectedRoute;

      route.exact = !(route.exact === false); // this makes exact default to true

      if (route.redirect) {
        return (
          <Route
            key={route.path}
            exact
            path={route.path}
            render={({ location }) => (
              <Redirect to={{ ...location, pathname: route.redirect }} />
            )}
          />
        );
      }

      return <MyRoute key={route.path} {...route} />;
    })}
  </Switch>
);

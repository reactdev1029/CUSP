import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { navigate } from 'gatsby';
// import userService from '../../services/user';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') && props.location.pathname === '/login' ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem('token') && props.location.pathname !== '/login' ? (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export { PrivateRoute, PublicRoute };

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        //   For debbuging
        // console.log("user", user);
        if (!user) {
          // If not log-ined, render children which is Component such as signin or signup
          return children;
        }

        if (user) {
          // For debbuging
          // console.log("I am loged-in", loggedInPath)
          return (
            <Redirect
              to={{
                // If user is loggen in redirect to the needed path
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (user) {
            return children;
          }
          // If someone is trying to get an acess to the protected route, return signin page
          if (!user) {
            return (
              <Redirect
                to={{
                  pathname: 'signin',
                  state: { from: location },
                }}
              />
            );
          }
          // For crazy cases, when application does not know what to do
          return null;
        }}
      />
    );
  }

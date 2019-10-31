import React from 'react';

import { AuthorizationContext } from 'features/authorization';

export const WithPermissions = <P extends object>(Component: React.ComponentType<P>, needsAuthorization: boolean = true) => {
  return (props: P) => {
    if (needsAuthorization) {
      return (
        <AuthorizationContext.Consumer>
          {authContext => (authContext.isAuthorizing ? null : authContext.isAuthorized ? <Component {...props} /> : null)}
        </AuthorizationContext.Consumer>
      );
    }

    return (
      <AuthorizationContext.Consumer>
        {authContext => (authContext.isAuthorizing ? null : authContext.isAuthorized ? null : <Component {...props} />)}
      </AuthorizationContext.Consumer>
    );
  };
};

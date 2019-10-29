import React from 'react';

import { AuthorizationContext } from 'providers/authorization/AuthorizationProvider';

const WithPermissions = <P extends object>(Component: React.ComponentType<P>, needsAuthorization: boolean = true) => {
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

export default WithPermissions;

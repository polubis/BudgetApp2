import React, { useState, useEffect, useContext } from 'react';

import { AuthorizationData } from '.';
import { FirebaseContext } from 'features/firebase';

const initialAuthorizationData: AuthorizationData = {
  isAuthorized: false,
  isAuthorizing: true,
  authUser: null
};

const Context = React.createContext(initialAuthorizationData);

const AuthorizationProvider: React.FC = ({ children }) => {
  const [authorizationData, setAuthorizationData] = useState<AuthorizationData>(initialAuthorizationData);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(authUser => {
      if (authUser && authUser.email) {
        const { email, phoneNumber, photoURL, uid, displayName } = authUser;

        setAuthorizationData({
          isAuthorized: true,
          isAuthorizing: false,
          authUser: { email, phoneNumber, photoURL, uid, displayName }
        });
      }
    });
    return () => {
      listener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Context.Provider value={authorizationData}>{children}</Context.Provider>;
};

export { Context as AuthorizationContext };

export default AuthorizationProvider;

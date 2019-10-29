import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from 'providers/firebase/FirebaseProvider';

interface AuthorizedUser {
  email: string;
  uid: string;
  refreshToken: string;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface AuthorizationData {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  authUser: AuthorizedUser | null;
}

const initialAuthorizationData = {
  isAuthorized: false,
  isAuthorizing: true,
  authUser: null,
};

const Context = React.createContext<AuthorizationData>({ ...initialAuthorizationData });

const AuthorizationProvider: React.FC = ({ children }) => {
  const [authorizationData, setAuthorizationData] = useState<AuthorizationData>(initialAuthorizationData);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(authUser => {
      if (authUser && authUser.email) {
        const { email, refreshToken, phoneNumber, photoURL, uid, displayName } = authUser;

        setAuthorizationData({
          isAuthorized: true,
          isAuthorizing: false,
          authUser: { email, refreshToken, phoneNumber, photoURL, uid, displayName }
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

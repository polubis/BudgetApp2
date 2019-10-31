import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';

class Firebase {
  static DEV_CONFIG = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID
  };

  public auth: app.auth.Auth;

  constructor() {
    app.initializeApp(Firebase.DEV_CONFIG);
    this.auth = app.auth();
  }

  public createUserByCredentials = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

  public signInWithCredentials = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  public signOut = () => this.auth.signOut();
}

const firebase = new Firebase();

const Context = React.createContext(firebase);

const FirebaseProvider: React.FC = ({ children }) => {
  return <Context.Provider value={firebase}>{children}</Context.Provider>;
};

export { Context as FirebaseContext };

export default FirebaseProvider;

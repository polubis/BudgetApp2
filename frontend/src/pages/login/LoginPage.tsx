import React, { useState, useContext } from 'react';

import { FirebaseContext } from 'providers/firebase/FirebaseProvider';

import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInWithCredentials } = useContext(FirebaseContext);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signInWithCredentials(email, password);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='row-c-c mh-100vh' id='login-page'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Type email in' />
        </fieldset>

        <fieldset>
          <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Type password' />
        </fieldset>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;

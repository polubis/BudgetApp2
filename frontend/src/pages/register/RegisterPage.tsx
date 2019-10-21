import React, { useState, useContext } from 'react';

import { FirebaseContext } from 'providers/firebase/FirebaseProvider';
import UsersService from 'services/UsersService';

import './RegisterPage.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fbContext = useContext(FirebaseContext);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authUser = await fbContext.createUserByCredentials(email, password);
      if (authUser.user) {
        await UsersService.saveUser(email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='row-c-c mh-100vh' id='register-page'>
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

export default RegisterPage;

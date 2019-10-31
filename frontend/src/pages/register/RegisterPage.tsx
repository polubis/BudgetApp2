import React, { useState, useContext } from 'react';

import { FirebaseContext } from 'features/firebase';
import { usersService, WithPermissions } from 'features/authorization';

import './RegisterPage.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { createUserByCredentials } = useContext(FirebaseContext);

  const handleAddUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authUser = await createUserByCredentials(email, password);
      if (authUser.user) {
        await usersService.addUser(email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='row-c-c mh-100vh' id='register-page'>
      <form onSubmit={handleAddUser}>
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

export default WithPermissions(RegisterPage, false);

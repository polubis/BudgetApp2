import React, { useState } from 'react';

import './RegisterPage.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='centered mh-100vh' id='register-page'>
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

export default RegisterPage;

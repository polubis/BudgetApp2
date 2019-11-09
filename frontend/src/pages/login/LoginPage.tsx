import React, { useState } from 'react';

import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='centered mh-100vh' id='login-page'>
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

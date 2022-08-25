import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUser from './DemoUser';
import './LoginForm.css'
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';

const LoginForm = ({ setShowModal2 }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className='login-form'>
      <h2>Welcome Back!</h2>
      <div>
      {errors.length > 0 && (
          <ul className='errors'>
            {errors.map(error => (
                <li className='error' key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <div className='login-input-container'>
        <div className='input-container'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='input-container signup-last'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <label htmlFor='password'>Password</label>
        </div>
      </div>
      <div className='submit-login'>
        <button type='submit'>Login</button>
      </div>
      <div className='signup-form-bottom'>
        {/* <div className='wavy-red-underline'></div> */}
        <div className='red-underline'></div>
          <h3>Don't have an account? Sign up here!</h3>
          <SignUpFormModal />
        {/* render signup modal here */}
      </div>
    </form>
  );
};

export default LoginForm;

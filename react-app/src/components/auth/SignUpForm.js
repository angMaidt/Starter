import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginFormModal from './LoginFormModal';
import './SignUpForm.css'

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password))
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  //make into handlelogin
  // const handleSignUp = () => {
  //   setShowModal(false)
  //   //return <Redirect to="/sign-up" />
  // }

  return (
    <form onSubmit={onSignUp} className='signup-form'>
      <h2>Sign up to share your recipes and leave comments!</h2>
      <div>
       {errors.length > 0 && (
          <ul className='errors'>
            {errors.map(error => (
                <li className='error' key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <div className='input-container'>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          ></input>
          <label>*User Name</label>
      </div>
      <div className='input-container'>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          ></input>
          <label>*Email</label>
      </div>
      <div className='input-container'>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          ></input>
          <label>*Password</label>
      </div>
      <div className='input-container signup-last'>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
          <label>*Confirm Password</label>
      </div>
      <div className='footnotes signup-footnotes'>
        <h6>* = required field</h6>
        <button type='submit'>Sign Up</button>
      </div>
      <div className='signup-form-bottom'>
        <div className='wavy-red-underline'></div>
        <h3>Already have an account? Login here!</h3>
        <LoginFormModal onClick={() => setShowModal(false)}/>
        {/* render login modal here */}
      </div>
    </form>
  );
};

export default SignUpForm;

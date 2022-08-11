import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // validations
  // useEffect(() => {
  //   let errors = []

  //   if (!username) errors.


  // },[username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password))
      if (data) {
        setErrors(data)
      }
    }
    setErrors(['Passwords must match.'])
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
    <form onSubmit={onSignUp}>
      <div>
        {/* {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))} */}
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
          <label>User Name</label>
      </div>
      <div className='input-container'>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          ></input>
          <label>Email</label>
      </div>
      <div className='input-container'>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          ></input>
          <label>Password</label>
      </div>
      <div className='input-container'>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
          <label>Confirm Password</label>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

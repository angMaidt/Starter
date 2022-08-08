import React from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
import SystemSwitch from '../SystemSwitch/SystemSwitch';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navbar-container'>
      <Link to='/' className='link logo-link' style={{ 'textDecoration': 'none' }}>
        <div class='nav logo-container'>
          <img src='starter-logo.gif' alt='logo' />
          <h1>starter</h1>
        </div>
      </Link>
      <div className='nav auth-links'>
        <div>

          {/* user auth */}
          {sessionUser ?
            <>
              <LogoutButton />
              {/* <NavLink to='/recipes/new' exact={true} activeClassName='active'>
                Submit a New Recipe!
              </NavLink> */}
            </>
            :
            <>
                <DemoUser />
                {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink> */}
            </>
          }
        </div>

          {/* tabs */}
        <div className='nav right-link-container'>
          {/* <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul> */}
          <NavLink to='/' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
            <h3>Getting Started</h3>
          </NavLink>
          {/* note: / = login currently */}
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
          <NavLink to='/recipes' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
          <h3>Explore</h3>
          </NavLink>
          <NavLink to='/my-recipes' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
          <h3>My Recipes</h3>
          </NavLink>
          {/* <SystemSwitch /> */}
          <NavLink to='/home' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
            <h3>About</h3>
          </NavLink>
        </div>
      </div>

    </nav>
  );
}

export default NavBar;

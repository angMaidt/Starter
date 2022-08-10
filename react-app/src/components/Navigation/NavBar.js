import React from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
import SignUpFormModal from '../auth/SignUpFormModal/SignUpFormModal';
// import SystemSwitch from '../SystemSwitch/SystemSwitch';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <nav className='navbar-container'>
        <Link to='/' className='link logo-link' style={{ 'textDecoration': 'none' }}>
          <div class='nav logo-container'>
            <img src='../../../static/starter-logo-moving-transparent.gif' alt='logo' />
            <h1>starter</h1>
          </div>
        </Link>
        <div className='nav auth-links'>
          <div>
            {/* user auth */}
            {sessionUser ?
              <>
                <LogoutButton />
              </>
              :
              <>
                  <DemoUser />
                  <SignUpFormModal/>
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
            <NavLink to='/' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline',  }} style={{ 'textDecoration': 'none' }}>
              <div className='tab'>
                <h3>Home</h3>
              </div>
            </NavLink>
            <NavLink to='/sourdough-faq' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
              <div className='tab'>
                <h3>F.A.Q.</h3>
              </div>
            </NavLink>
            <NavLink to='/recipes' activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
              <div className='tab'>
                <h3>Explore</h3>
              </div>
            </NavLink>
            {/* note: / = login currently */}
            {sessionUser &&
              <>
                <NavLink to='/my-recipes' exact={true} activeClassName='active' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
                  <div className='tab'>
                    <h3>My Recipes</h3>
                  </div>
                </NavLink>
              </>
            }
            <NavLink to='/about' activeStyle={{ 'textDecoration': 'underline' }} style={{ 'textDecoration': 'none' }}>
              <div className='tab'>
                <h3>About</h3>
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
      <div className='nav-bottom'></div>
    </>
  );
}

export default NavBar;

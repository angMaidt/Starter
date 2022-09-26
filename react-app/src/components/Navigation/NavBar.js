import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal/SignUpFormModal';
// import SystemSwitch from '../SystemSwitch/SystemSwitch';
import './NavBar.css'
import SearchBar from '../Search/SearchBar';

const NavBar = () => {
  // const [hover, setHover] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  // const [hover, setHover] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <nav className='navbar-container'>
        <Link to='/' className='link logo-link' style={{ 'textDecoration': 'none' }}>
          <div class='nav logo-container'>
            <img src='../../../static/starter-logo-moving-transparent.gif' alt='logo' id='jar-logo'/>
            {/* <img src='../../../static/bubble-logo.png' alt='bubble-logo' id='bubble-logo'/> */}
            <h1>starter</h1>
          </div>
        </Link>
        <div className='nav links'>
          <div className='auth-links'>
            {/* user auth */}
            {sessionUser ?
              <>
                <LogoutButton />
              </>
              :
              <>  <div className='demo-user-container'>
                    <DemoUser />
                  </div>
                  <SignUpFormModal />
                  <LoginFormModal />
              </>
            }
          </div>

          {/* search */}
            <div className='nav search-container'>
              <img
                src='../../../static/icon-search.svg'
                alt='icon-search'
                id='icon-search'
                onClick={() => setShowSearch(!showSearch)}
                title='Search'/>
            {showSearch && (
              <SearchBar setShowSearch={setShowSearch}/>
              )}
            </div>

            {/* tabs */}
          <div className='nav right-link-container'>
            <NavLink
              to='/' exact={true}
              className='tab'
              activeClassName='active'
              activeStyle={{ 'textDecoration': 'underline var(--red-orange) 2px', 'textUnderlineOffset': '4px' }}>
              <h3>Home</h3>
            </NavLink>
            <NavLink to='/recipes'
              className='tab'
              activeClassName='active'
              activeStyle={{ 'textDecoration': 'underline var(--red-orange) 2px', 'textUnderlineOffset': '4px' }}>
              {/* <div className='tab'> */}
                <h3>Explore</h3>
              {/* </div> */}
            </NavLink>
            {/* note: / = login currently */}
            {sessionUser &&
              <>
                <NavLink to='/my-recipes'
                  exact={true}
                  className='tab'
                  activeClassName='active'
                  activeStyle={{ 'textDecoration': 'underline var(--red-orange) 2px', 'textUnderlineOffset': '4px' }}>
                  {/* <div className='tab'> */}
                    <h3>My Recipes</h3>
                  {/* </div> */}
                </NavLink>
              </>
            }
          </div>
        </div>
      </nav>
      <div className='nav-bottom'></div>
    </>
  );
}

export default NavBar;

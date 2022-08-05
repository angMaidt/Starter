import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/recipes' exact={true} activeClassName='active'>
            Recipes
          </NavLink>
        </li>
        {sessionUser ?
          <>
          <li>
            <NavLink to='/recipes/new' exact={true} activeClassName='active'>
              Submit a New Recipe!
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
          </>
          :
          <>
            <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
            </li>
            <li>
              <DemoUser />
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;

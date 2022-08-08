import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './LeftNav.css'

function LeftNav() {
    const sessionUser = useSelector(state => state.session.user)

    return (
            <div className="left-nav">
                {!sessionUser ?
                    <div className='left-link-container'>
                        <NavLink to='/sign-up' exact={true} activeClassName='left-active' style={{ 'textDecoration': 'none' }}>
                            <h4>Signup</h4>
                        </NavLink>
                        <NavLink to='/login' exact={true} activeClassName='active' style={{ 'textDecoration': 'none' }}>
                            <h4>Login</h4>
                        </NavLink>
                    </div>
                    :
                    <div className='left-link-container'>
                        <NavLink to='/recipes/new' exact={true} activeClassName='left-active' style={{ 'textDecoration': 'none' }}>
                            <h4>New Recipe!</h4>
                        </NavLink>
                        <NavLink to='/my-recipes' exact={true} activeClassName='left-active' style={{ 'textDecoration': 'none' }}>
                            <h4>My Recipes!</h4>
                        </NavLink>
                        {/* a calculator would be great to have in here */}
                    </div>
                }
            </div>
    )
}

export default LeftNav

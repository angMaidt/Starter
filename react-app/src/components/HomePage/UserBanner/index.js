import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import bread1 from '../../../images/boule.png'
import bread2 from '../../../images/baguette.png'
import bread3 from '../../../images/batard.png'
import bread4 from '../../../images/seeded.png'

function UserBanner({ sessionUser }) {
    const history = useHistory()

    const [hover, setHover] = useState(false)
    const [bread, setBread] = useState('')
    const [color, setColor] = useState('')

    //pick random bread and color for banner
    const breadArr = [bread1, bread2, bread3, bread4]
    const colorArr= ['var(--red-orange)', 'var(--light-blue)', 'pink', 'var(--pale-blue)']

    useEffect(() => {
        setBread(breadArr[Math.floor(Math.random()*breadArr.length)])
        setColor(colorArr[Math.floor(Math.random()*colorArr.length)])
    }, [])

    return (
        <div className="banner user">
            <div className='banner-left'
                style={{ 'background-color': `${color}` }}>
                <img src={bread}/>
                {/* <h1>Welcome back, {sessionUser.username}!</h1> */}
            </div>
            <div className='taxonomy-bar'>
                Let's get Started! Let's get Started! Let's get Started! Let's get Started! Let's get Started!
            </div>
            <div
                className='banner-right'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => history.push('/recipes')}>
                <h1>Welcome back, {sessionUser.username}!</h1>
                <div className='user-banner-CTA'>
                    <h3 className={hover ? 'underlined' : null}>Check out the latest recipes</h3>
                    <button
                        className='arrow-button'
                        id={hover ? 'yellow-bg': null}
                        onClick={() => history.push('/recipes')}>
                        <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UserBanner;

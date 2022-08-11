import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
    return (
        <div className='homepage'>
            <div className='welcome-ribbon'>
                <div className='welcome-ribbon-text'>
                    <h3><span>Explore sourdough recipes.</span> <span>Share your own.</span> <span>Leave and recieve feedback.</span></h3>
                    <h3>Founded in 2022, serving 7 million bread nerds a month.</h3>
                </div>
            </div>
            <div className="banner">
                <div className='banner-image-container'>
                    <img src='../../../static/lined-up.jpg' alt='banner-1' />
                </div>
                <div className='taxonomy-bar'>
                    Let's get Started!
                    Let's get Started!
                    Let's get Started!
                    Let's get Started!
                    Let's g
                </div>
                <div className='banner-text'>
                    <h2>Loaf Lover?</h2>
                    <h2>Crust Connoisseur?</h2>
                    <h2>Welcome to Starter!</h2>
                    <div className='next-button-container homepage-arrow'>
                        <h3>Explore Recipes</h3>
                        <Link to='/recipes'>
                            <button className='arrow-button'>
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='github-links-container'>
                <a href='https://github.com/angMaidt' style={{ 'color': 'var(--off-white)' }}>
                    <i class="fa-brands fa-github"></i>
                </a>
                <a href='https://www.linkedin.com/in/angie-maidt-69b6b8248/' style={{ 'color': 'var(--off-white)' }}>
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>
            {/* <div className='welcome-ribbon'></div> */}
        </div>
    )
}

export default HomePage

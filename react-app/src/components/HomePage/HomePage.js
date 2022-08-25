import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bread1 from '../../images/boule.png'
import bread2 from '../../images/baguette.png'
import bread3 from '../../images/batard.png'
import bread4 from '../../images/seeded.png'
import './HomePage.css'

function HomePage() {
    //make count state
    const [count, setCount] = useState(1)
    console.log(count)
    //render bread + text based on state
    //button to inc and dec count needed on text screen
    //only checking count once, need it to check every iteration

    useEffect(() => {
            const interval = setInterval(() => {
                setCount(count => count + 1)
            }, 2500)
            return () => clearInterval(interval)
    }, []);

    if (count > 4) setCount(1)
    return (
        <div className='homepage'>
            <div className='welcome-ribbon'>
                <div className='welcome-ribbon-text'>
                    <h3><span>Explore sourdough recipes.</span> <span>Share your own.</span></h3>
                    <h3>Founded in 2022, serving 7 million bread nerds a month.</h3>
                </div>
            </div>
            <div className="banner">
                <div className='banner-image-container'
                    style={
                        count === 1 ?
                            {'backgroundColor': 'var(--red-orange)'}
                        :
                        count === 2 ?
                            {'backgroundColor': 'var(--light-blue)'}
                        :
                        count === 3 ?
                            {'backgroundColor': 'pink'}
                        :
                        {'backgroundColor': 'var(--pale-blue)'}}>
                    <h1
                        id='welcome'
                        style={
                            count === 1 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            count === 2 ?
                                {'textShadow': '2px 4px var(--red-orange)'}
                            :
                            count === 3 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            {'textShadow': '2px 4px var(--red-orange)'}}>Welcome to Starter!</h1>
                    {/* {count === 1 && (
                    <div>
                        <img id='b-1' alt='sourdough boule' src={bread1}/>
                    </div>
                    )}
                    {count === 2 && (
                        <div>
                            <img id='b-2' alt='sourdough baguette' src={bread2} style={{'width': '160%'}} />
                        </div>
                        )}
                        {count === 3 && (
                        <div>
                            <img id='b-3' alt='sourdough batard' src={bread3}/>
                        </div>
                        )}
                        {count === 4 && (
                            <div>
                            <img id='b-4' alt='sourdough seeded' src={bread4}/>
                            </div>
                        )} */}
                    <div>
                        <img id='b-1' alt='sourdough boule' src={bread1}/>
                    </div>
                    <div>
                        <img id='b-2' alt='sourdough baguette' src={bread2} style={{'width': '110%'}} />
                    </div>
                    <div>
                        <img id='b-3' alt='sourdough batard' src={bread3}/>
                    </div>
                    <div>
                        <img id='b-4' alt='sourdough seeded' src={bread4}/>
                    </div>
                </div>

                {/* <div className='taxonomy-bar'>
                    Let's get Started!
                    Let's get Started!
                    Let's get Started!
                    Let's get
                </div>
                <div className='banner-text'>
                    <h2
                        style={{
                            'color': 'var(--dark-blue)',
                            // 'textDecoration': 'underline',
                            'backgroundColor': 'var(--yellow)',
                            'fontSize': '70px'
                        }}>Welcome to Starter!</h2>
                    <p>Your one-stop shop for all things sourdough. Explore Don't forget to leave a comment and let us know how your bake went. Happy fermenting!</p>
                    <div className='next-button-container homepage-arrow'>
                        <h3>Explore Recipes</h3>
                        <Link to='/recipes'>
                            <button className='arrow-button'>
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </Link>
                    </div> */}
                    {/* {count === 1 && (
                        // <h2 style={{ 'color': 'var(--red-orange)' }}>Loaf Lover?</h2>
                        <h2 >Loaf Lover?</h2>
                    )}
                    {count === 2 && (
                        // <h2 style={{ 'color': 'var(--yellow)' }}>Can't get enough Crust?</h2>
                        <h2>Can't get enough Crust?</h2>
                    )}
                    {count === 3 && (
                        <>
                            <h2
                                style={{
                                    'color': 'var(--dark-blue)',
                                    'textDecoration': 'underline',
                                    'backgroundColor': 'var(--yellow)',
                                    'fontSize': '70px'
                                }}>Welcome to Starter!</h2>
                            <p>Welcome to Starter! Here you can explore sourdough recipes and share your own. Don't forget to leave a comment and let us know how your bake went. Happy fermenting!</p>
                            <div className='next-button-container homepage-arrow'>
                                <h3>Explore Recipes</h3>
                                <Link to='/recipes'>
                                    <button className='arrow-button'>
                                        <i class="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                </Link>
                            </div>
                        </>
                    )} */}
                    {/* <button onClick={() => setCount(count + 1)}></button> */}
                {/* </div> */}
            </div>
            <div className='github-links-container'>
                <a href='https://github.com/angMaidt' style={{ 'color': 'var(--off-black)' }}>
                    <i class="fa-brands fa-github"></i>
                </a>
                <a href='https://www.linkedin.com/in/angie-maidt-69b6b8248/' style={{ 'color': 'var(--off-black)' }}>
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>
            {/* <div className='welcome-ribbon'></div> */}
        </div>
    )
}

export default HomePage

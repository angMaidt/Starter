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
                    <p>Here to help you get moving on your bread journey.</p>
                </div>
            </div>
            {/* <div className='welcome-ribbon'></div> */}
        </div>
    )
}

export default HomePage

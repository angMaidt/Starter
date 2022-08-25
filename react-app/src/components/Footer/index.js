function Footer() {
    return (
        <div id='footer'>
            {/* <div><h2>Contact me!</h2></div> */}
            <div className='github-links-container'>
                <a href='https://github.com/angMaidt' style={{ 'color': 'var(--off-black)' }}>
                    <i class="fa-brands fa-github"></i>
                </a>
                <a href='https://www.linkedin.com/in/angie-maidt-69b6b8248/' style={{ 'color': 'var(--off-black)' }}>
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>
            <div id='footer-text-container'>
                <p>©Angie Maidt 2022</p>
                <p>Inspired by <a href='https://www.seriouseats.com'>Serious Eats</a></p>
            </div>
        </div>
    )
}

export default Footer

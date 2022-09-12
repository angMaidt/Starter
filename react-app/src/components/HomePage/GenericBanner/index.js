import { useEffect, useState } from 'react'

import bread1 from '../../../images/boule.png'
import bread2 from '../../../images/baguette.png'
import bread3 from '../../../images/batard.png'
import bread4 from '../../../images/seeded.png'


function GenericBanner() {
    const [count, setCount] = useState(1)

    //changes banner color every 2s
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + 1)
        }, 2000)
        return () => clearInterval(interval)
    }, []);

    //resets bg color count
    if (count > 4) setCount(1)

    return (
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
                {/* <h1
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
                        {'textShadow': '2px 4px var(--red-orange)'}}>Welcome!</h1> */}
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
            </div>
        </div>
    )
};

export default GenericBanner;

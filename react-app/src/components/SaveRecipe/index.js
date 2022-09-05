import { useState } from "react"
import './SaveRecipe.css'

function SaveRecipe() {
    const [hover, setHover] = useState(false)
    // const [filled, setFilled] = useState('fa-regular')

    return (
        <>
            <i
                id='liked'
                className={hover ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}></i>
            {/* {hover ?
            :
            <i id='not-liked' className="fa-regular fa-heart"></i>
            } */}
        {/* <p>Save</p> */}
        </>
    )
}

export default SaveRecipe

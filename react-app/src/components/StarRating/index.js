import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css'

function StarRating({ rating, setRating }) {
    // const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, idx) => {
                const ratingValue = idx
                return (
                    <label key={idx}>
                        <input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue + 1)}
                            />
                        <FaStar
                            color={ratingValue < (hover || rating) ? '#ff575d': '#DCDCDC'}
                            size={100}
                            className='star'
                            onMouseOver={() => setHover(ratingValue + 1)}
                            onMouseLeave={() => setHover(null)}
                            />
                            {/* {console.log(rating)} */}
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating;

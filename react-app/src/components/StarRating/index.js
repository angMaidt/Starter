import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css'

function StarRating({ rating, setRating }) {
    // const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
        <div className='star-container'>
            {[...Array(5)].map((_star, idx) => {
                const ratingValue = idx
                return (
                    <label key={idx} className='star-label'>
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
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating;

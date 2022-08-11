import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './StarRating.css'

function StarRating() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, idx) => {
                const ratingValue = idx + 1
                return (
                    <label>
                        <input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            />
                        <FaStar
                            color={ratingValue < (hover || rating) ? '#ff575d': '#DCDCDC'}
                            size={100}
                            className='star'
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            />
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating;

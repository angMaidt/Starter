import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
// import { useHistory } from "react-router-dom"
import { postCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'
import StarRating from '../../StarRating'
import './NewCommentForm.css'

function NewCommentForm({ recipe }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [rating, setRating] = useState(null)
    // console.log(rating)
    const [body, setBody] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    //validations
    useEffect(() => {
        let errors = []

        if (!rating) errors.push('Please leave a rating before submitting!')
        if (body.length > 750) errors.push('Please enter less than 750 characters!')
        setValidationErrors(errors)
    }, [rating, body])


    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (validationErrors.length) return

        const payload = {
            rating,
            body,
            user_id: sessionUser.id,
            recipe_id: recipe.id
        }
        // console.log(payload)


        try {
            const data = await dispatch(postCommentThunk(payload))
            if (data) {
                setHasSubmitted(false)
                setRating(null)
                setBody('')
            }
            await dispatch(getRecipesThunk())

        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    //check if user has commented
    let commented = false
    for (let comment of recipe.comments) {
        if (comment.user.id === sessionUser.id) {
            commented = true
        }
    }

    return (
        <>
            {hasSubmitted && validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            <form onSubmit={handleSubmit} className='comment-form'>
                <div className='comment-input-container'>
                    <div className='star-input-container'>
                        <label>
                            <span className='asterisk'>*</span>Rate and comment
                        </label>
                        <StarRating rating={rating} setRating={setRating}/>
                    </div>
                    <div className='comment-body'>
                        <div className='user-info'>
                            <div>
                                <img src={sessionUser.profile_pic} alt='profile-pic' />
                            </div>
                        </div>
                        {commented ?
                            <textarea
                            placeholder='Only one comment allowed per user!'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            style={{ 'fontSize': '15px' }}
                            disabled
                            ></textarea>
                        :
                            <textarea
                                placeholder='Join the discussion...'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{ 'fontSize': '15px' }}
                                ></textarea>
                        }
                        {/* <label>Comment</label> */}
                    </div>
                </div>
                <div className='submit-comment'>
                    <h6>
                        <span className='asterisk'>*</span>
                        Rating = required
                    </h6>
                    {commented ?
                        <button id='disabled-submit' disabled>Cannot Submit</button>
                    :
                        <button>Submit</button>
                    }
                </div>
            </form>
        </>
    )
}

export default NewCommentForm

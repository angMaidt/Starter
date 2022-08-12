import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { editCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'
// import { useHistory } from "react-router-dom"
import './EditCommentForm.css'
import StarRating from '../../StarRating'

function EditCommentForm({ comment, sessionUser, showEdit, setShowEdit }) {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(comment.rating)
    const [body, setBody] = useState(comment.body)
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
            recipe_id: comment.recipe_id,
            id: comment.id
        }

        setShowEdit(!showEdit)

        try {
            const data = await dispatch(editCommentThunk(payload))
            await dispatch(getRecipesThunk())

        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            {/* <h3>Edit Comment</h3> */}
            {hasSubmitted && validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            <form onSubmit={handleSubmit} className='edit-comment-wrapper'>
                <div className='user-info'>
                    <div>
                        <img src={comment.user.profile_pic} alt='profile-pic' />
                    </div>
                </div>
                <div className='comment-right'>
                    <div className='comment-input-container'>
                        <div className='edit-star-input-container'>
                            <label className='edit-comment-label'>
                                Edit rating and comment!
                            </label>
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <div className='comment-body'>
                            <textarea
                                className='edit-comment-textarea'
                                placeholder='Join the discussion...'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{ 'fontSize': '15px' }}
                                >
                            </textarea>
                            {/* <label>Comment</label> */}
                        </div>
                    </div>
                    <div className='submit-edit-comment'>
                        <span onClick={() => setShowEdit(!showEdit)} className='cancel-button'>Cancel</span>
                        <button>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditCommentForm

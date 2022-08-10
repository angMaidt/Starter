import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { editCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'
// import { useHistory } from "react-router-dom"

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
            <h3>Edit Comment</h3>
            {hasSubmitted && validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            <form onSubmit={handleSubmit} className='comment-form'>
                <div className='comment-input-container'>
                    <div className='input-container'>
                        <select
                            type='number'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <label>*Rating</label>
                    </div>
                    <div className='input-container'>
                        <textarea
                            placeholder='Join the discussion...'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            >
                        </textarea>
                        <label>Comment</label>
                    </div>
                </div>
                <div className='submit-comment'>
                    <span onClick={() => setShowEdit(!showEdit)} className='cancel-button'>Cancel</span>
                    <button>Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditCommentForm

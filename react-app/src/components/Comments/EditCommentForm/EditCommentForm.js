import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { editCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'
// import { useHistory } from "react-router-dom"

function EditCommentForm({ comment, sessionUser, setShowEdit }) {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(comment.rating)
    const [body, setBody] = useState(comment.body)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            rating,
            body,
            user_id: sessionUser.id,
            recipe_id: comment.recipe_id,
            id: comment.id
        }
        setShowEdit(false)
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
            <form onSubmit={handleSubmit}>
                <div className='comment-input-container'>
                    <div className='input-container'>
                        <label>Rating</label>
                        <input
                            type='number'
                            placeholder='5 Stars! Good Show!'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Comment</label>
                        <textarea
                            placeholder='Love this recipe! Yas queen~!'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default EditCommentForm

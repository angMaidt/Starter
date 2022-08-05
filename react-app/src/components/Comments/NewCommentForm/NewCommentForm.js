import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { postCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'

function NewCommentForm({ recipe }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [rating, setRating] = useState(5)
    const [body, setBody] = useState('')
    const [validationErrors, setValidationErrors] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            rating,
            body,
            user_id: sessionUser.id,
            recipe_id: recipe.id
        }

        try {
            const data = await dispatch(postCommentThunk(payload))
            await dispatch(getRecipesThunk())

        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            <h3>Leave a comment!</h3>
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
                        <input
                            type='text'
                            placeholder='Love this recipe! Yas queen~!'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default NewCommentForm

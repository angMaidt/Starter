import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'

import EditCommentForm from '../EditCommentForm/EditCommentForm'

function SingleComment({ comment }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [showEdit, setShowEdit] = useState(false)

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await dispatch(deleteCommentThunk(comment))
            await dispatch(getRecipesThunk())

        } catch (e) {
            alert('Delete Failed!' + e)
        }
    }

    return (
        <div style={{ 'border': '1px solid black' }}>
            <div style={{ 'height': '30px', 'width': '30px', 'borderRadius': '100%', 'overflow': 'hidden' }}>
                <img src={comment.user.image_url} alt='profile-pic' />
            </div>
            <p>{ comment.user.username }</p>
            <p>{ comment.rating }</p>
            <p>{ comment.created_at }</p>
            <p>{ comment.body }</p>
            {showEdit && <EditCommentForm comment={comment} sessionUser={sessionUser} setShowEdit={setShowEdit}/>}
            {sessionUser && sessionUser.id === comment.user.id &&
                <div>
                    <button onClick={handleDelete}>Delete Comment</button>
                    <button onClick={() => setShowEdit(true)}>Edit Comment</button>
                </div>
            }
        </div>
    )
}

export default SingleComment

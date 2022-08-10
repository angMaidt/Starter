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
        (showEdit ?
            <EditCommentForm
                comment={comment}
                sessionUser={sessionUser}
                showEdit={showEdit}
                setShowEdit={setShowEdit}/>
        :
            <div className='comment-form'>
                <div style={{ 'height': '30px', 'width': '30px', 'borderRadius': '100%', 'overflow': 'hidden' }}>
                    <img src={comment.user.image_url} alt='profile-pic' />
                </div>
                <p>{ comment.user.username }</p>
                <p>{ comment.rating }</p>
                <p>{ comment.created_at }</p>
                <p>{ comment.body }</p>
                {/* {showEdit && <EditCommentForm comment={comment} sessionUser={sessionUser} setShowEdit={setShowEdit}/>} */}
                {sessionUser && sessionUser.id === comment.user.id &&
                    <div>
                        <div onClick={() => setShowEdit(!showEdit)}><span>edit</span></div>
                        <div onClick={handleDelete}><span>delete</span></div>
                    </div>
                }
            </div>

        )
    )
}

export default SingleComment

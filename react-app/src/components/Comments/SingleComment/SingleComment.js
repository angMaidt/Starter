import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentThunk } from '../../../store/comment'
import { getRecipesThunk } from '../../../store/recipe'

import EditCommentForm from '../EditCommentForm/EditCommentForm'
import './SingleComment.css'

function SingleComment({ comment }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [showEdit, setShowEdit] = useState(false)

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            await dispatch(deleteCommentThunk(comment))
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
                <div className='user-info'>
                    <div style={{ 'height': '50px', 'width': '50px', 'borderRadius': '100%', 'overflow': 'hidden' }}>
                        <img src={comment.user.profile_pic} alt='profile-pic' />
                    </div>
                    <h4>{ comment.user.username }</h4>
                </div>
                <span>Posted {comment.created_at}</span>
                <p>{ comment.rating }</p>
                <div className='comment-body-container'>
                    <p>{ comment.body }</p>
                    {/* {showEdit && <EditCommentForm comment={comment} sessionUser={sessionUser} setShowEdit={setShowEdit}/>} */}
                    {sessionUser && sessionUser.id === comment.user.id &&
                        <div className='ingredient-container'>
                            <div onClick={() => setShowEdit(!showEdit)}><span>edit</span></div>
                            <div onClick={handleDelete} id='delete' className='cancel-button'><span>delete</span></div>
                        </div>
                    }
                </div>
            </div>

        )
    )
}

export default SingleComment

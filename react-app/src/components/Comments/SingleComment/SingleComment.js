import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
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
                <div className='user-info comment-header'>
                    <div>
                        {sessionUser && <img src={sessionUser.profile_pic} alt='profile-pic' />}
                    </div>
                    <h4>{ comment.user.username }</h4>
                    <div className='posted-rating'>
                        {/* <p className='dot'>●</p> */}
                        <span>Posted {comment.created_at.split(' ').slice(1, 4).join(' ')}</span>
                        <p className='dot'>●</p>
                        <p>{ [...Array(comment.rating)].map(star => <FaStar className='rated' />) }</p>
                        <p>{ [...Array(5 - comment.rating)].map(star => <FaStar color='#DCDCDC' className='rated'/>) }</p>

                    </div>
                </div>
                <div className='comment-body-wrapper'>
                    <div className='comment-body-container'>
                        <p>{ comment.body }</p>
                        {sessionUser && sessionUser.id === comment.user.id &&
                            <div>
                                <div onClick={() => setShowEdit(!showEdit)}>
                                    <span>edit</span>
                                </div>
                                <div onClick={handleDelete} id='delete' className='cancel-button'>
                                    <span>delete</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        )
    )
}

export default SingleComment

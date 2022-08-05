// import { useState } from 'react'
import { useSelector } from 'react-redux'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import SingleComment from "../SingleComment/SingleComment"

function CommentSection({ recipe }) {
    const sessionUser = useSelector(state => state.session.user)
    // const [showAddComment, setShowAddComment] = useState(false)

    return (
        <>
            {sessionUser ?
                <NewCommentForm recipe={recipe}/>
                :
                <p>Login to leave a comment!</p>
            }
            {recipe.comments.length > 0 ?
                Object.values(recipe.comments).map(comment => (
                    <SingleComment comment={comment} />
                ))
                :
                <p>Looks like no one has left a comment yet, be the first!</p>
            }

        </>
    )
}

export default CommentSection

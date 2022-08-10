// import { useState } from 'react'
import { useSelector } from 'react-redux'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import SingleComment from "../SingleComment/SingleComment"

function CommentSection({ recipe }) {
    const sessionUser = useSelector(state => state.session.user)
    // const [showAddComment, setShowAddComment] = useState(false)

    const ordered_comments = Object.values(recipe.comments).sort((a, b) => a.created_at > b.created_at ? -1 : 1)

    return (
        <>
            {sessionUser ?
                <NewCommentForm recipe={recipe}/>
                :
                <p>Login to leave a comment!</p>
            }
            {recipe.comments.length > 0 ?
                ordered_comments.map(comment => (
                    <SingleComment comment={comment} />
                ))
                :
                <p>Looks like no one has left a comment yet, be the first!</p>
            }

        </>
    )
}

export default CommentSection

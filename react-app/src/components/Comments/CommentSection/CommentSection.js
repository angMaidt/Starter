// import { useState } from 'react'
import { useSelector } from 'react-redux'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import SingleComment from "../SingleComment/SingleComment"
// import StarRating from '../../StarRating'

function CommentSection({ recipe }) {
    const sessionUser = useSelector(state => state.session.user)
    // console.log(recipe.comments)

    // //check if user has commented
    // let commented = false
    // for (let comment of recipe.comments) {
    //     if (comment.user.id === sessionUser.id) {
    //         commented = true
    //     }
    // }

    // console.log(commented)

    // const ordered_comments = Object.values(recipe.comments).sort((a, b) => a.created_at > b.created_at ? -1 : 1)

    return (
        <>
            {/* <StarRating/> */}
            {sessionUser ?
                <NewCommentForm recipe={recipe}/>
                :
                <h3>Login to leave a comment!</h3>
            }
            {recipe.comments.length > 0 ?
                Object.values(recipe.comments).map(comment => (
                    <SingleComment comment={comment} />
                ))
                :
                <h3>Looks like no one has left a comment yet, be the first!</h3>
            }

        </>
    )
};

export default CommentSection;

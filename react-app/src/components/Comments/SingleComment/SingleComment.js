import { useSelector } from 'react-redux'

function SingleComment({ comment }) {
    const sessionUser = useSelector(state => state.session.user)
    return (
        <div style={{ 'border': '1px solid black' }}>
            <div style={{ 'height': '30px', 'width': '30px', 'borderRadius': '100%', 'overflow': 'hidden' }}>
                <img src={comment.user.image_url} alt='profile-pic' />
            </div>
            <p>{ comment.user.username }</p>
            <p>{ comment.rating }</p>
            <p>{ comment.created_at }</p>
            <p>{ comment.body }</p>
            <div>
                {/* <button></button> */}
            </div>
        </div>
    )
}

export default SingleComment

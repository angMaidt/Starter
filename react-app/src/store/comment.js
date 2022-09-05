//actions
const GET_COMMENTS ='comments/get_comments'
const CREATE_COMMENT ='comments/create_comment'
const EDIT_COMMENT ='comments/edit_comment'
const DELETE_COMMENT ='comments/delete_comment'

//action creators
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

//thunks
export const getCommentsThunk = () => async (dispatch) => {
    const res = await fetch('/api/comments');
    if (res.ok) {
        const data = await res.json()
        dispatch(getComments(data.comments));
    }
    else {
        const err = await res.json();
        throw err;
    }
}

export const postCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()

        if (data.errors) {
            return
        }
        dispatch(createComment(data))
        return data
    }
}

export const editCommentThunk = (comment) => async (dispatch) => {
    // console.log(comment)
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editComment(data))
        return data
    } else {
        const err = await res.json()
        throw err
    }
}

export const deleteCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        if (data.message === "Comment Deleted!") {
            dispatch(deleteComment(comment))
        }
        return comment
    } else {
        const err = await res.json()
        throw err
    }
}

//reducer
const initialState = {}

export default function comment_reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_COMMENTS:
        newState = { ...state }
        action.comments.forEach(comment => newState[comment.id] = comment)
        return newState
    case CREATE_COMMENT:
        newState = { ...state }
        newState[action.comment.id] = action.comment
        return newState
    case EDIT_COMMENT:
        newState = { ...state, [action.comment.id]: action.comment }
        return newState
    case DELETE_COMMENT:
        newState = { ...state }
        delete newState[action.comment.id]
        return newState
    default:
      return state;
  }
}

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../store/recipe"
import './SaveRecipe.css'

function SaveRecipe({ recipe }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    let user_id
    if (user) {
        user_id = user.id
    }

    const [hover, setHover] = useState(false)
    const [like, setLike] = useState(false)
    const [owner, setOwner] = useState(false)

    useEffect(() => {
        //checks if owner of recipe
        if (user_id === recipe.user.id) {
            setOwner(true)
        }

        if (!owner) {
            for (let save of recipe.saves) {
                if (save.id === user_id) {
                    setLike(true)
                }
        }

        }
    },[user_id, recipe.saves])

    const handleLike = async (e) => {
        e.preventDefault()

        setLike(true)

        const payload = {
            user_id
        }

        try {
            const res = await fetch(`/api/recipes/${recipe.id}/save`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                // const data = res.json()
                // console.log('good like!')
                await dispatch(getRecipesThunk())
            }

        } catch (e) {
            alert('Like Failed, Please Try Again')
        }
    }

    const handleUnlike = async (e) => {
        e.preventDefault()

        setLike(false)

        const payload = {
            user_id
        }

        try {
            const res = await fetch(`/api/recipes/${recipe.id}/unsave`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                // const data = res.json()
                // console.log('good unlike!')
                await dispatch(getRecipesThunk())
            }
        } catch (e) {
            alert('Unlike Failed, Please Try Again')
        }
    }

    if (!user) {
        return (
            <div id='logged-out-like'>
                <p id='like-login-prompt'>Login to like this Recipe!</p>
                <i
                id='not-liked'
                className={`${hover ? 'fa-solid' : 'fa-regular'} fa-heart`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}></i>
            </div>
        )
    }

    if (owner) {
        return (
            <div id='logged-out-like'>
                <p id='like-login-prompt' style={{ 'color': 'var(--dark-blue)' }}>You posted this recipe!</p>
                <i
                id='not-liked'
                className='fa-solid fa-bookmark'
                style={{ 'color': 'var(--yellow)' }}></i>
        </div>
        )
    }

    return (
        <>
            {like ?
                <i
                    id='liked'
                    className="fa-solid fa-heart"
                    title='Unlike this recipe!'
                    onClick={handleUnlike}></i>
                    :
                    <i
                    id='not-liked'
                    className={`${hover ? 'fa-solid' : 'fa-regular'} fa-heart`}
                    title='Like this recipe!'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    // onMouseEnter={() => setHover(true)}
                    // onMouseLeave={() => setHover(false)}
                    onClick={handleLike}></i>

            }
        {/* <p>Save</p> */}
        </>
    )
}

export default SaveRecipe

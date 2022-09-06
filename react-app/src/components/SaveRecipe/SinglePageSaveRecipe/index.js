import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../../store/recipe"
import '../SaveRecipe.css'

function SinglePageSaveRecipe({ recipe }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    let user_id
    if (user) {
        user_id = user.id
    }
    // console.log("user id: " + user_id)
    // const has_liked = recipe.saves.filter(user => (
    //     user.id === user_id
    // ))
    // console.log(has_liked)
    //map through arr
    //see if current user id matches any user.id
    const [hover, setHover] = useState(false)
    const [like, setLike] = useState(false)

    useEffect(() => {
        for (let save of recipe.saves) {
            if (save.id === user_id) {
                setLike(true)
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
                console.log('good like!')
                await dispatch(getRecipesThunk())
            }

        } catch (e) {
            alert('Like Failed')
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
                console.log('good unlike!')
                await dispatch(getRecipesThunk())
            }
        } catch (e) {
            alert('Unlike Failed')
        }
    }

    if (!user) {
        return (
            <div
                className='recipe-like-container'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick=''>
                <h3 id='sp-like-login-prompt'>Login to like this Recipe!</h3>
                <i
                id='sp-not-liked'
                className={`${hover ? 'fa-solid' : 'fa-regular'} fa-heart`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}></i>
            </div>
        )
    }

    return (
        <div
            className='recipe-like-container'
            title={like ? 'Click to Like' : 'Click to Unlike'}
            onClick={like ? handleUnlike : handleLike}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {like ?
                <>
                    <h3>Recipe Liked</h3>
                    <i
                        id='sp-liked'
                        className="fa-solid fa-heart"
                        title='Click to unlike'
                        ></i>
                </>
                        :
                <>
                    <h3>Like Recipe</h3>
                    <i
                    id='sp-not-liked'
                    className={`${hover ? 'fa-solid' : 'fa-regular'} fa-heart`}
                    title='Like this recipe!'
                    // onMouseEnter={() => setHover(true)}
                    // onMouseLeave={() => setHover(false)}
                    ></i>
                </>
            }
        {/* <p>Save</p> */}
        </div>
    )
}

export default SinglePageSaveRecipe

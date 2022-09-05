import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../store/recipe"
import './SaveRecipe.css'

function SaveRecipe({ recipe }) {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user.id)
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

    return (
        <>
            {/* <i
                id='liked'
                className={hover || liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleLike}
                ></i> */}
            {like ?
                <i
                    id='liked'
                    className="fa-solid fa-heart"
                    onClick={handleUnlike}></i>
                    :
                    <i
                    id='not-liked'
                    className={`${hover ? 'fa-solid' : 'fa-regular'} fa-heart`}
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

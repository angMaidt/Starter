import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { postRecipeThunk } from '../../../store/recipe'
import NewIngredientForm from "./NewIngredientForm/NewIngredientForm"
import NewRecipeForm from "./NewRecipeForm/NewRecipeForm"

function RecipeForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    let [count, setCount] = useState(1)

    // const handleSubmit = async(e) => {
    //     e.preventDefault()

    //     setHasSubmitted(true)
    //     const payload = {
    //         user_id: sessionUser.id,
    //         title,
    //         image_url,
    //         description,
    //         active_time,
    //         prep_time: proofing_time,
    //         bake_time,
    //         baking_temp,
    //         total_yield
    //     }

    //     try {
    //         await dispatch(postRecipeThunk(payload))
    //         history.push('/recipes')
    //     } catch (e) {
    //         setValidationErrors(e.errors)
    //     }
    // }

    return (
        <>
            <h1>Submit a New Recipe</h1>
            <NewRecipeForm />
            {Array(count).fill(<NewIngredientForm count={count} />)}
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)} disabled={count < 2}>-</button>
        </>
    )
}

export default RecipeForm

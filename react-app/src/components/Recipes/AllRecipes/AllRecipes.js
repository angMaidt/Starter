import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from '../RecipeCard/RecipeCard'

function AllRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    if (recipes) console.log(recipes)

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])


    return (
        <>
            <h1>Hey from All Recipes!</h1>
            {recipes &&
                recipes.Object.value.forEach(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))
            }
        </>
    )
}

export default AllRecipes

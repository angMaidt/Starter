import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from '../RecipeCard/RecipeCard'

function AllRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    // if (recipes) console.log(recipes)

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    //sorts by updated_at
    let sorted_recipes
    if (recipes) {
        sorted_recipes = Object.values(recipes).sort((a, b) => a.updated_at > b.updated_at ? -1: 1)
    }

    return (
        <>
            <h1>Hey from All Recipes!</h1>
            {sorted_recipes &&
                Object.values(sorted_recipes).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))
            }
        </>
    )
}

export default AllRecipes

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from '../RecipeCard/RecipeCard'
import RecipeForm from '../RecipeForms/RecipeForm'
import './MyRecipes.css'

function MyRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const sessionUser = useSelector(state => state.session.user)

    const [showRecipeForm, setShowRecipeForm] = useState(false)
    // if (recipes) console.log(recipes)

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    let my_recipes, sorted_recipes
    if (recipes && sessionUser) {
        my_recipes = Object.values(recipes).filter(recipe => {
            // <RecipeCard key={recipe.id} recipe={recipe} />
            return recipe.user.id === sessionUser.id
        })
        sorted_recipes = my_recipes.sort((a, b) => a.updated_at > b.updated_at ? -1: 1)
    }


    // console.log(my_recipes)

    return (
        <>
            <div className='my-recipe-tabs'>
                <div className={!showRecipeForm ? 'active-tab': 'inactive'}>
                    <h2 onClick={() => setShowRecipeForm(false)}>My recipes</h2>
                </div>
                <div className={showRecipeForm ? 'active-tab': 'inactive'}>
                    <h2 onClick={() => setShowRecipeForm(true)}>Add a Recipe</h2>
                </div>
            </div>
            {showRecipeForm ?
                <RecipeForm />
            :
                sorted_recipes && sorted_recipes.length > 0 ?
                    Object.values(sorted_recipes).map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                :
                    <h3>Looks like you don't have any recipes!</h3>
            }
        </>
    )
}

export default MyRecipes

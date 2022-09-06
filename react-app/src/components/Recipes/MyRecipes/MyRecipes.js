import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from '../RecipeCard/RecipeCard'
import NewRecipeForm from '../RecipeForms/NewRecipeForm/NewRecipeForm'
import './MyRecipes.css'

function MyRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const sessionUser = useSelector(state => state.session.user)

    // const [showRecipeForm, setShowRecipeForm] = useState(false)
    // const [showLikedRecipes, setShowLikedRecipes] = useState(false)
    const [myRecipesState, setMyRecipesState] = useState(1)
    // if (recipes) console.log(recipes)

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    //Getting all of user's recipes
    let sorted_recipes
    if (recipes && sessionUser) {
        let my_recipes = Object.values(recipes).filter(recipe => {
            return recipe.user.id === sessionUser.id
        })
        sorted_recipes = my_recipes.sort((a, b) => a.updated_at > b.updated_at ? -1: 1)
    }

    //Get all user's liked recipes
    let liked_recipes = []
    if (recipes && sessionUser) {
        for (let recipe of Object.values(recipes)) {
            for (let save of recipe.saves) {
                if(save.id === sessionUser.id) {
                    liked_recipes.push(recipe)
                }
            }
        }
    }

    return (
        <div className='view-container'>
            <div className='my-recipe-tabs'>
                <div className={myRecipesState === 1 ? 'active-tab': 'inactive'}>
                    <h2 onClick={() => setMyRecipesState(1)}>My recipes</h2>
                </div>
                <div className={myRecipesState === 2 ? 'active-tab': 'inactive'}>
                    <h2 onClick={() => setMyRecipesState(2)}>Liked Recipes</h2>
                </div>
                <div className={myRecipesState === 3 ? 'active-tab': 'inactive'}>
                    <h2 onClick={() => setMyRecipesState(3)}>Add a Recipe</h2>
                </div>
            </div>
            {myRecipesState === 1 &&
                <div className='recipes-container'>
                    {sorted_recipes && sorted_recipes.length > 0 ?
                        Object.values(sorted_recipes).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    :
                    <h3 id='no-recipes'>Looks like you haven't posted any recipes!</h3>
                    }
                </div>
            }

            {myRecipesState === 2 &&
                <div className='recipes-container'>
                    {liked_recipes && liked_recipes.length > 0 ?
                        Object.values(liked_recipes).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    :
                    <h3 id='no-recipes'>Looks like you haven't liked any recipes!</h3>
                    }
                </div>
            }

            {myRecipesState === 3 &&
                <NewRecipeForm />
            }
            {/* {showRecipeForm ?
                <NewRecipeForm />
            :
            <div className='recipes-container'>
                {sorted_recipes && sorted_recipes.length > 0 ?
                    Object.values(sorted_recipes).map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                :
                    <h3>Looks like you don't have any recipes!</h3>}

            </div>
            } */}
        </div>
    )
}

export default MyRecipes

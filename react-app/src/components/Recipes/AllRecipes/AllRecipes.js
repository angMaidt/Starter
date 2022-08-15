import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from '../RecipeCard/RecipeCard'
import './AllRecipes.css'

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
        sorted_recipes = Object.values(recipes).sort((a, b) => a.id > b.id ? -1 : 1)
    }

    return (
        <>  <div>
                <h1 id='all-recipes'>All Recipes</h1>
                {/* <div className='page-header-underline'></div> */}
            </div>
            <div className='all-recipes-view-container'>
                {/* <div className='tag'><span>RECIPES</span></div> */}
                <div className='recipes-container'>
                    {sorted_recipes &&
                        Object.values(sorted_recipes).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default AllRecipes

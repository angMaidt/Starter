import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getRecipesThunk } from '../../../store/recipe'
import RecipeCard from "../../Recipes/RecipeCard/RecipeCard";


function SearchResults() {
    const { term } = useParams()
    const searchTerm = term.slice(6) //slices after = sign
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)

    //might not need this?
    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    //filter through
    //make into a function ?
    let searchResults
    if (recipes) {
        searchResults = Object.values(recipes).filter(recipe => {
            return recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }
    // console.log(searchResults)

    return (
        <>
            <h1>Results for '{searchTerm}'</h1>
            <div className='all-recipes-view-container'>
                <div className='recipes-container'>

                </div>
            </div>
            {searchResults.length > 0 ?
                    <div className='all-recipes-view-container'>
                        <div className='recipes-container'>
                            {searchResults.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
            :
                <p>No titles that match that search :(</p>
            }
            {/* <p>{Object.values(searchResults)}</p> */}
        </>
    )
}

export default SearchResults;

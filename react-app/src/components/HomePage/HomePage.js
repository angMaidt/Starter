import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import bread1 from '../../images/boule.png'
// import bread2 from '../../images/baguette.png'
// import bread3 from '../../images/batard.png'
// import bread4 from '../../images/seeded.png'
import { getRecipesThunk } from '../../store/recipe'
import RecipeCard from '../Recipes/RecipeCard/RecipeCard'
import GenericBanner from './GenericBanner'
import './HomePage.css'
import UserBanner from './UserBanner'

function HomePage() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes).slice(0, 4))
    const sessionUser = useSelector(state => state.session.user)

    //fetch featured recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    return (
        <div className='homepage'>
            <div className='welcome-ribbon'>
                <div className='welcome-ribbon-text'>
                    <h3><span>Explore sourdough recipes.</span> <span>Share your own.</span></h3>
                    <h3>Founded in 2022, serving 7 million bread nerds a month.</h3>
                </div>
            </div>

            {/* render custom banner if logged in */}
            {sessionUser ?
                <UserBanner />
            :
                <GenericBanner />
            }

            <div className='featured-recipes'>
                <h2 id='featured-recipes'>Featured Recipes</h2>
                <div className='page-header-underline'></div>
                <div id='featured-recipe-wrapper'>
                    <div className='recipes-container'>
                        {recipes && (
                            recipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import bread1 from '../../images/boule.png'
import bread2 from '../../images/baguette.png'
import bread3 from '../../images/batard.png'
import bread4 from '../../images/seeded.png'
import { getRecipesThunk } from '../../store/recipe'
import './HomePage.css'
import RecipeCard from '../Recipes/RecipeCard/RecipeCard'

function HomePage() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes).slice(0, 4))
    const [count, setCount] = useState(1)

    //changes banner color every 2s
    useEffect(() => {
            const interval = setInterval(() => {
                setCount(count => count + 1)
            }, 2000)
            return () => clearInterval(interval)
    }, []);

    //fetch featured recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    //resets bg color count
    if (count > 4) setCount(1)

    return (
        <div className='homepage'>
            <div className='welcome-ribbon'>
                <div className='welcome-ribbon-text'>
                    <h3><span>Explore sourdough recipes.</span> <span>Share your own.</span></h3>
                    <h3>Founded in 2022, serving 7 million bread nerds a month.</h3>
                </div>
            </div>
            <div className="banner">
                <div className='banner-image-container'
                    style={
                        count === 1 ?
                        {'backgroundColor': 'var(--red-orange)'}
                        :
                        count === 2 ?
                        {'backgroundColor': 'var(--light-blue)'}
                        :
                        count === 3 ?
                        {'backgroundColor': 'pink'}
                        :
                        {'backgroundColor': 'var(--pale-blue)'}}>
                    {/* <h1
                        id='welcome'
                        style={
                            count === 1 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            count === 2 ?
                                {'textShadow': '2px 4px var(--red-orange)'}
                            :
                            count === 3 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            {'textShadow': '2px 4px var(--red-orange)'}}>Welcome!</h1> */}
                    <div>
                        <img id='b-1' alt='sourdough boule' src={bread1}/>
                    </div>
                    <div>
                        <img id='b-2' alt='sourdough baguette' src={bread2} style={{'width': '110%'}} />
                    </div>
                    <div>
                        <img id='b-3' alt='sourdough batard' src={bread3}/>
                    </div>
                    <div>
                        <img id='b-4' alt='sourdough seeded' src={bread4}/>
                    </div>
                    <h1
                        id='welcome'
                        style={
                            count === 1 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            count === 2 ?
                                {'textShadow': '2px 4px var(--red-orange)'}
                            :
                            count === 3 ?
                                {'textShadow': '2px 4px var(--light-blue)'}
                            :
                            {'textShadow': '2px 4px var(--red-orange)'}}>Welcome to Starter!</h1>
                </div>
            </div>
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

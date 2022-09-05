import { useState } from 'react'
import { Link } from 'react-router-dom'
import SaveRecipe from '../../SaveRecipe'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
    const [hover, setHover] = useState(false)
    if(!recipe) return null
    return (
        <Link to={`/recipes/${recipe.id}`} style={{ 'textDecoration': 'none' }}>
            <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ 'border': '1px solid var(--off-black)' }}
            className='card-container'>
                <div className='card-container-left'>
                    <img src={recipe.image_url} onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src ='../../../../../static/default-bread.jpg'
                    }} alt={`recipe-${recipe.id}`} />
                </div>
                <div className='card-container-right'>
                    <div className='card-bottom-info'>
                        <h3
                            className={hover ? 'yellow-bg': null }
                            style={{ 'fontWeight': '500' }}>{recipe.title}</h3>
                        {/* <div className='title-underline'></div> */}
                        {/* <p>{recipe.description}</p> */}
                        <div className='username-info'>
                            <h4>by {recipe.user.username}</h4>
                        </div>
                    </div>
                    {/* <div className='recipe-card-arrow'>
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </div> */}
                </div>
                <SaveRecipe recipe={recipe}/>
            </div>
        </Link>
    )
}

export default RecipeCard

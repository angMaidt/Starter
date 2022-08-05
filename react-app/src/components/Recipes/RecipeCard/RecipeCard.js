import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
    // console.log('here')
    if(!recipe) return null
    return (
        <Link to={`/recipes/${recipe.id}`}>
            <div style={{ 'border': '1px solid black' }}>
                    <h3>{recipe.title}</h3>
                    <div className='recipe-card-photo'>
                        <img src={recipe.image_url} alt={`recipe-${recipe.id}`} />
                    </div>
                    <p>{recipe.description}</p>
            </div>
        </Link>
    )
}

export default RecipeCard

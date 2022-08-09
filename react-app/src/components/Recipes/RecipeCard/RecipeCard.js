// import { useState } from 'react'
import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
    // const [yellow, setYellow] = useState(false)
    console.log('here')
    if(!recipe) return null
    return (
        <Link to={`/recipes/${recipe.id}`} style={{ 'textDecoration': 'none' }}>
            <div
            // onMouseEnter={() => setYellow(true)}
            // onMouseLeave={() => setYellow(false)}
            style={{ 'border': '1px solid black' }}
            className='card-container'>
                <div className='card-container-left'>
                    <div className='recipe-card-photo'>
                        <div className='card-image-container'>
                            <img src={recipe.image_url} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src ='../../../../../static/default-bread.jpg'
                            }} alt={`recipe-${recipe.id}`} />
                        </div>
                        <div>
                            <p>{recipe.created_at}</p>
                        </div>
                    </div>
                </div>
                <div className='card-container-right'>
                    <h3>{recipe.title}</h3>
                    <div className='title-underline'></div>
                    <div className='card-bottom-info'>
                        <div className='user-info'>
                            {/* <div>
                                <img src={recipe.user.profile_pic} alt='profile' />
                            </div> */}
                            <h4>By {recipe.user.username}</h4>
                        </div>
                        <p>{recipe.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard

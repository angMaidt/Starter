// import { useState } from 'react'
import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
    // const [yellow, setYellow] = useState(false)
    // console.log('here')
    if(!recipe) return null
    return (
        <Link to={`/recipes/${recipe.id}`} style={{ 'textDecoration': 'none' }}>
            <div
            // onMouseEnter={() => setYellow(true)}
            // onMouseLeave={() => setYellow(false)}
            style={{ 'border': '1px solid black' }}
            className='card-container'>
                <div className='card-container-left'>
                    {/* <div className='recipe-card-photo'>
                        <div className='card-image-container'>
                            <img src={recipe.image_url} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src ='../../../../../static/default-bread.jpg'
                            }} alt={`recipe-${recipe.id}`} />
                        </div>
                        <div>
                            <p>Posted {recipe.created_at.split(' ').slice(1, 4).join(' ')}</p>
                        </div>
                    </div> */}
                    {/* <div className='recipe-card-photo'> */}
                        {/* <div className='card-image-container'> */}
                            <img src={recipe.image_url} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src ='../../../../../static/default-bread.jpg'
                            }} alt={`recipe-${recipe.id}`} />
                        {/* </div> */}
                    {/* </div> */}
                </div>
                <div className='card-container-right'>
                    <div className='card-bottom-info'>
                    <h3>{recipe.title}</h3>
                    {/* <div className='title-underline'></div> */}
                        <p>{recipe.description}</p>
                        <div className='username-info'>
                            <h4>by {recipe.user.username}</h4>
                        </div>
                    </div>
                    <div className='recipe-card-arrow'>
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard

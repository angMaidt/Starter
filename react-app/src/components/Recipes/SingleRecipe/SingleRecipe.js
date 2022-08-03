import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function SingleRecipe() {
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes[id])
    console.log(recipe)

    if (!recipe) return null
    return (
        <>
            <h1>Welcome to Single Recipe!</h1>
            <div>
                <h2>{recipe.title}</h2>
                <p>By {recipe.user.username}</p>
                <p>Posted {recipe.created_at}</p>
            </div>
            <div>
                <img src={recipe.image_url} alt={`recipe-${recipe.id}`} />
            </div>
            <p>{recipe.description}</p>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>Instructions</div>
            <ol>
                {recipe.instructions.map(instruction => (
                    <li key={instruction.id}>
                        <p>{instruction.specification}</p>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default SingleRecipe

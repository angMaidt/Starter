import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteRecipeThunk } from '../../../store/recipe'
import EditRecipeForm from '../RecipeForms/EditRecipeForm/EditRecipeForm'

function SingleRecipe() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const recipe = useSelector(state => state.recipes[id])
    const sessionUser = useSelector(state => state.session.user)

    const [showEditForm, setShowEditForm] = useState(false)
    // console.log(sessionUser)

    const convert_ms = (ms) => {
        const mins = Math.floor((ms/1000)/60)
        if (mins >= 60) {
            const hrs = Math.floor(mins/60)
            const remaining_mins = Math.floor(mins % 60)
            return [hrs, remaining_mins]
        }
        return mins
    }

    // const convert_to_fahrenheit = (celsius) => {
    //     const farenheit = celsius * 1.8 + 32
    //     return farenheit
    // }

    const handleDelete = async(e) => {
        e.preventDefault()
        try {
            const res = await dispatch(deleteRecipeThunk(recipe))
            window.alert('delete recipe successful!')
            history.push('/recipes')

        } catch (e) {
            return window.alert(`delete failed! ${e}`)
        }

    }

    return (
        <>
            <h1>Welcome to Single Recipe!</h1>
            {recipe ?
            <>
                <div>
                    <h2>{recipe.title}</h2>
                    <p>By {recipe.user.username}</p>
                    <p>Posted {recipe.created_at}</p>
                </div>
                <div>
                    <img src={recipe.image_url} alt={`recipe-${recipe.id}`} />
                </div>
                <p>{recipe.description}</p>
                <div style={{ 'border': '1px solid black' }}>
                    <h3>Recipe Facts</h3>
                    {/* <p>Hydration: {calculate_hydration(flour_amount, water_amount)}%</p> */}
                    <p>Active Time: {convert_ms(recipe.active_time)} mins</p>
                    <p>Proofing Time: {convert_ms(recipe.prep_time)} mins</p>
                    <p>Baking Time: {convert_ms(recipe.bake_time)} mins</p>
                    {/* <p>Total Time:
                        {convert_ms(recipe.bake_time + recipe.active_time + recipe.prep_time)[0]} hour
                        {convert_ms(recipe.bake_time + recipe.active_time + recipe.prep_time)[1]} mins
                    </p> */}
                    <p>Baking Temp: {recipe.baking_temp} °C </p>
                    <p>Total Yield: {recipe.total_yield}</p>
                </div>
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
                <div>
                    <h3>Instructions</h3>
                    <ol>
                        {recipe.instructions.map(instruction => (
                            <li key={instruction.id}>
                                <p>{instruction.specification}</p>
                            </li>
                        ))}
                    </ol>
                </div>
                {showEditForm && <EditRecipeForm recipe={recipe} setShowEditForm={setShowEditForm} />}
                {sessionUser && sessionUser.id === recipe.user.id &&
                <div>
                    <button onClick={() => setShowEditForm(true)}>Edit Recipe!</button>
                    <button onClick={handleDelete}>Delete Recipe!</button>
                </div>
                }
            </>
            :
            <p>Looks like there's nothing here!</p>
            }
        </>
    )
}

export default SingleRecipe

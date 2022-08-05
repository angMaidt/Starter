import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteRecipeThunk } from '../../../store/recipe'
import EditIngredientForm from '../RecipeForms/EditIngredientForm/EditIngredientForm'
import EditRecipeForm from '../RecipeForms/EditRecipeForm/EditRecipeForm'

function SingleRecipe() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const recipe = useSelector(state => state.recipes[id])
    const sessionUser = useSelector(state => state.session.user)

    const [showEditForm, setShowEditForm] = useState(false)
    // console.log(sessionUser)

    const ms_converter = (ms) => {
        let mins = ms % 3600000
        let hrs = ms - mins
        let secs = mins % 60000
        mins = mins - secs
        hrs = hrs/3600000
        mins = mins/60000
        return [hrs, mins]
    }

    const convert_to_fahrenheit = (celsius) => {
        const farenheit = celsius * 1.8 + 32
        return farenheit
    }

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

    //sorts instructions by list order so they show up in correct order
    let ordered_instructions
    if (recipe) {
        ordered_instructions = Object.values(recipe.instructions).sort((a, b) => (a.list_order > b.list_order ? 1: -1))
    }

    let ordered_ingredients
    if (recipe) {
        ordered_ingredients = Object.values(recipe.ingredients).sort((a, b) => (a.id > b.id ? 1: -1))
    }

    // console.log(ordered_instructions)
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
                    <p>Active Time: {ms_converter(recipe.active_time)[0]} hrs {ms_converter(recipe.active_time)[1]} mins</p>
                    <p>Proofing Time: {ms_converter(recipe.prep_time)[0]} hrs {ms_converter(recipe.prep_time)[1]} mins</p>
                    <p>Baking Time: {ms_converter(recipe.bake_time)[0]} hrs {ms_converter(recipe.bake_time)[1]} mins</p>
                    <p>Baking Temp: {recipe.baking_temp}</p>
                    <p>Total Yield: {recipe.total_yield}</p>
                </div>
                <div>
                    <h3>Ingredients</h3>
                    <ul>
                        {ordered_ingredients.map(ingredient => (
                            <li key={ingredient.id}>
                                <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p>
                                {/* <EditIngredientForm ingredient={ingredient} recipeId={recipe.id}/> */}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Instructions</h3>
                    {/* <ul style={{ 'listStyle': 'none'}}> */}
                        {ordered_instructions.map(instruction => (
                            // <li key={instruction.id}>
                                <p key={instruction.id}>{instruction.list_order}. {instruction.specification}</p>
                            // </li>
                        ))}
                    {/* </ul> */}
                </div>
                {showEditForm && <EditRecipeForm recipe={recipe} setShowEditForm={setShowEditForm} />}
                {sessionUser && sessionUser.id === recipe.user.id &&
                <div>
                    {!showEditForm ?
                        <button onClick={() => setShowEditForm(true)}>Edit Recipe!</button>
                    :
                    <button onClick={() => setShowEditForm(false)}>Cancel Edit</button>
                    }
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

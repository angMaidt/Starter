import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteRecipeThunk } from '../../../store/recipe'
import EditIngredientForm from '../RecipeForms/EditIngredientForm/EditIngredientForm'
import EditInstructionForm from '../RecipeForms/EditInstructionForm/EditInstructionForm'
import EditRecipeForm from '../RecipeForms/EditRecipeForm/EditRecipeForm'
import CommentSection from '../../Comments/CommentSection/CommentSection'
import NewIngredientForm from '../RecipeForms/NewIngredientForm/NewIngredientForm'
import NewInstructionForm from '../RecipeForms/NewInstructionForm/NewInstructionForm'
import { SystemContext } from '../../../context/SystemContext'
// import NewCommentForm from '../../Comments/NewCommentForm/NewCommentForm'

function SingleRecipe() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const recipe = useSelector(state => state.recipes[id])
    const { system } = useContext(SystemContext)
    const sessionUser = useSelector(state => state.session.user)

    const [showEditForm, setShowEditForm] = useState(false)

    const [showEditIng, setShowEditIng] = useState(false)
    const [showAddIng, setShowAddIng] = useState(false)

    const [showEditInst, setShowEditInst] = useState(false)
    const [showAddInst, setShowAddInst] = useState(false)

    const [measurementUnits, setMeasurementUnits] = useState('')
    // console.log(sessionUser)

    useEffect(() => {
        async function fetchUnits() {
            const res = await fetch('/api/recipes/units')
            const data = await res.json()
            setMeasurementUnits(data.units)
        }
        fetchUnits()
    }, [])

    const handleDoneEditingIng = () => {
        setShowEditIng(false)
        setShowAddIng(false)
    }

    const handleDoneEditingInst = () => {
        setShowAddInst(false)
        setShowEditInst(false)
    }

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
                {sessionUser && sessionUser.id === recipe.user.id &&
                <div>
                    {!showEditForm ?
                        <button onClick={() => setShowEditForm(true)}>Edit Recipe!</button>
                    :
                    <div>
                        <EditRecipeForm recipe={recipe} setShowEditForm={setShowEditForm} ordered_ingredients={ordered_ingredients} ordered_instructions={ordered_instructions} />
                        <button onClick={() => setShowEditForm(false)}>Done Editing</button>
                    </div>
                    }
                    <button onClick={handleDelete}>Delete Recipe!</button>
                </div>
                }
                <div style={{ 'border': '1px solid black' }}>
                    <h3>Recipe Facts</h3>
                    <p>Active Time: {ms_converter(recipe.active_time)[0]} hrs {ms_converter(recipe.active_time)[1]} mins</p>
                    <p>Proofing Time: {ms_converter(recipe.prep_time)[0]} hrs {ms_converter(recipe.prep_time)[1]} mins</p>
                    <p>Baking Time: {ms_converter(recipe.bake_time)[0]} hrs {ms_converter(recipe.bake_time)[1]} mins</p>
                    {/* <p>Baking Temp: {system ? recipe.baking_temp  }</p> */}
                    {system ? <p>{recipe.baking_temp} °C</p> : <p>{convert_to_fahrenheit(recipe.baking_temp)} °F</p>}
                    <p>Total Yield: {recipe.total_yield}</p>
                </div>
                <div>
                    <h3>Ingredients</h3>
                    {!showEditIng ?
                    <div>
                        {sessionUser && sessionUser.id === recipe.user.id && <button onClick={() => setShowEditIng(true)}>Edit Ingredients</button>}
                        <ul>
                            {ordered_ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>
                        <button onClick={handleDoneEditingIng}>Done Editing</button>
                        {!showAddIng ?
                        <div>
                            <button onClick={() => setShowAddIng(true)}>Add Ingredients</button>
                        </div>
                        :
                        <div>
                            <NewIngredientForm recipe_id={recipe.id} measurementUnits={measurementUnits} edit={true}/>
                            <button onClick={() => setShowAddIng(false)}>Done Adding</button>
                        </div>
                        }
                        <ul>
                            {ordered_ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <EditIngredientForm recipe_id={recipe.id} measurementUnits={measurementUnits} ingredient={ingredient} setShowEditIng={setShowEditIng}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    }
                </div>
                <div>
                    <h3>Instructions</h3>
                    {!showEditInst ?
                        <div>
                            {sessionUser && sessionUser.id === recipe.user.id && <button onClick={() => setShowEditInst(true)}>Edit Instructions</button>}
                            {ordered_instructions.map(instruction => (
                                <p key={instruction.id}>{instruction.list_order}. {instruction.specification}</p>
                            ))}
                        </div>
                        :
                        <div>
                            <div>
                                <button onClick={handleDoneEditingInst}>Done Editing</button>
                                {ordered_instructions.map(instruction => (
                                    <EditInstructionForm key={instruction.id} instruction={instruction} recipe_id={recipe.id} current_length={recipe.instructions.length}/>
                                    ))}
                            </div>
                            {!showAddInst ?
                                <div>
                                    <button onClick={() => setShowAddInst(true)}>Add Instructions</button>
                                </div>
                                :
                                <div>
                                    <NewInstructionForm recipe_id={recipe.id} existing_list_order={recipe.instructions.length} edit={true}/>
                                    <button onClick={() => setShowAddInst(false)}>Done Adding</button>
                                </div>
                                }
                        </div>
                    }
                </div>
                <h2>Check out what people are saying!</h2>
                <CommentSection recipe={recipe} />
            </>
            :
            <p>Looks like there's nothing here!</p>
            }
        </>
    )
}

export default SingleRecipe

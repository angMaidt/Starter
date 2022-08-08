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
import './SingleRecipe.css'
// import { SystemContext } from '../../../context/SystemContext'
// import NewCommentForm from '../../Comments/NewCommentForm/NewCommentForm'

function SingleRecipe() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const recipe = useSelector(state => state.recipes[id])
    // const { system } = useContext(SystemContext)
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

    // const handleDoneEditingIng = () => {
    //     setShowEditIng(false)
    //     setShowAddIng(false)
    // }

    // const handleDoneEditingInst = () => {
    //     setShowAddInst(false)
    //     setShowEditInst(false)
    // }

    const ms_converter = (ms) => {
        let mins = ms % 3600000
        let hrs = ms - mins
        let secs = mins % 60000
        mins = mins - secs
        hrs = hrs/3600000
        mins = mins/60000
        return [hrs, mins]
    }

    // const convert_to_fahrenheit = (celsius) => {
    //     return Math.round(celsius * (9/5) + 32)
    // }

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await dispatch(deleteRecipeThunk(recipe))
            history.push('/my-recipes')

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
        <div className='view-container single-recipe-view'>
            {/* <h1>Welcome to Single Recipe!</h1> */}
            {recipe ?
            <>
                <div>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <div className='user-info'>
                        <h5>by {recipe.user.username}</h5>
                        {recipe.created_at === recipe.updated_at ?
                            <span>Posted {recipe.created_at}</span>
                            :
                            <span>Updated {recipe.updated_at}</span>
                        }
                    </div>
                </div>
                <div className='recipe-comment-info'>
                    <span>Rating</span>
                    <span>{recipe.comments.length} comments</span>
                </div>
                <div className='single-image-container'>
                    <img src={recipe.image_url} alt={`recipe-${recipe.id}`} />
                </div>
                <div className='header-button-container'>
                    <h3>Recipe Facts</h3>
                    {sessionUser && sessionUser.id === recipe.user.id &&
                    <div className='edit-button-container'>
                        <div onClick={() => setShowEditForm(!showEditForm)}><i className="fa-solid fa-pen"></i></div>
                        <div onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></div>
                    </div>
                    }
                </div>
                {!showEditForm ?
                    <div style={{ 'border': '1px solid black' }}>
                        <p>Active Time: {ms_converter(recipe.active_time)[0]} hrs {ms_converter(recipe.active_time)[1]} mins</p>
                        <p>Proofing Time: {ms_converter(recipe.prep_time)[0]} hrs {ms_converter(recipe.prep_time)[1]} mins</p>
                        <p>Baking Time: {ms_converter(recipe.bake_time)[0]} hrs {ms_converter(recipe.bake_time)[1]} mins</p>
                        <p>Baking Temp: {recipe.baking_temp} °F</p>
                        <p>Total Yield: {recipe.total_yield}</p>
                    </div>
                :
                <div>
                    <EditRecipeForm recipe={recipe} setShowEditForm={setShowEditForm} ordered_ingredients={ordered_ingredients} ordered_instructions={ordered_instructions} />
                    {/* <button onClick={() => setShowEditForm(false)}>Done Editing</button> */}
                </div>
                }
                <div>
                    <div className='header-button-container inst'>
                        <h3>Ingredients</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                <div onClick={() => setShowEditIng(!showEditIng)}><i className="fa-solid fa-pen"></i></div>
                                <div onClick={() => setShowAddIng(!showAddIng)}><i className="fa-solid fa-plus"></i></div>
                            </div>
                        }
                    </div>
                    {!showEditIng ?
                    <div>
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
                        <ul>
                            {ordered_ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <EditIngredientForm recipe_id={recipe.id} measurementUnits={measurementUnits} ingredient={ingredient} setShowEditIng={setShowEditIng}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    }
                    {showAddIng &&
                        <div>
                            <NewIngredientForm recipe_id={recipe.id} measurementUnits={measurementUnits} edit={true}/>
                        </div>
                    }
                </div>
                <div>
                    <div className='header-button-container inst'>
                        <h3>Instructions</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                <div onClick={() => setShowEditInst(!showEditInst)}><i className="fa-solid fa-pen"></i></div>
                                <div onClick={() => setShowAddInst(!showAddInst)}><i className="fa-solid fa-plus"></i></div>
                            </div>
                        }
                    </div>
                    {!showEditInst ?
                        <div>
                            {ordered_instructions.map(instruction => (
                                <p key={instruction.id}>{instruction.list_order}. {instruction.specification}</p>
                            ))}
                        </div>
                        :
                        <div>
                            <div>
                                {/* <button onClick={handleDoneEditingInst}>Done Editing</button> */}
                                {ordered_instructions.map(instruction => (
                                    <EditInstructionForm key={instruction.id} instruction={instruction} recipe_id={recipe.id} current_length={recipe.instructions.length}/>
                                    ))}
                            </div>
                        </div>
                    }
                    {showAddInst &&
                        <div>
                            <NewInstructionForm recipe_id={recipe.id} existing_list_order={recipe.instructions.length} edit={true}/>
                        </div>
                    }
                </div>
                <h2>Check out what people are saying!</h2>
                <CommentSection recipe={recipe} />
            </>
            :
            <p>Looks like there's nothing here!</p>
            }
        </div>
    )
}

export default SingleRecipe

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteRecipeThunk } from '../../../store/recipe'
import EditRecipeForm from '../RecipeForms/EditRecipeForm/EditRecipeForm'
import CommentSection from '../../Comments/CommentSection/CommentSection'
import NewIngredientForm from '../RecipeForms/NewIngredientForm/NewIngredientForm'
import NewInstructionForm from '../RecipeForms/NewInstructionForm/NewInstructionForm'
import './SingleRecipe.css'
import Ingredient from '../../Ingredient/Ingredient'
import Instruction from '../../Instruction/Instruction'

function SingleRecipe() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const recipe = useSelector(state => state.recipes[id])
    const sessionUser = useSelector(state => state.session.user)

    const [showEditForm, setShowEditForm] = useState(false)

    //edit ingredient states
    const [showEditIng, setShowEditIng] = useState(false)
    const [showAddIng, setShowAddIng] = useState(false)

    //edit instruction states
    const [showEditInst, setShowEditInst] = useState(false)
    const [showAddInst, setShowAddInst] = useState(false)

    const [measurementUnits, setMeasurementUnits] = useState('')

    useEffect(() => {
        async function fetchUnits() {
            const res = await fetch('/api/recipes/units')
            const data = await res.json()
            setMeasurementUnits(data.units)
        }
        fetchUnits()
    }, [])

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

    //scroll to ingredients header
    // const ingEl = document.getElementById('recipe-ingredients')
    // const headerOffset = 45
    // const elementPosition = ingEl.getBoundingClientRect().top
    // const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    // window.scrollTo({
    //     top: offsetPosition,
    //     behavior: 'smooth'
    // })


    return (
        <div className='view-container single-recipe-view'>
            {recipe ?
            <>
                <div>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <div className='user-info'>
                        <h5>by {recipe.user.username}</h5>
                        {recipe.created_at === recipe.updated_at ?
                            <span>Posted {recipe.created_at.split(' ').slice(1, 4).join(' ')}</span>
                            :
                            <span>Updated {recipe.updated_at.split(' ').slice(1, 4).join(' ')}</span>
                        }
                    </div>
                </div>
                <div className='recipe-comment-info'>
                    <span>Rating</span>
                    <span>{recipe.comments.length} comments</span>
                </div>
                <div className='single-image-container'>
                    <img src={recipe.image_url} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src ='../../../../../static/default-bread.jpg'
                    }} alt={`recipe-${recipe.id}`} />
                </div>
                <div className='header-button-container'>
                    <h3>Recipe Facts</h3>
                    {sessionUser && sessionUser.id === recipe.user.id &&
                    <div className='edit-button-container'>
                        <div onClick={() => setShowEditForm(!showEditForm)}>
                            <i className="fa-solid fa-pen"></i>
                        </div>
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
                    <EditRecipeForm
                        recipe={recipe}
                        setShowEditForm={setShowEditForm}
                        ordered_ingredients={ordered_ingredients}
                        ordered_instructions={ordered_instructions} />
                </div>
                }

                {/* Ingredients */}
                <div>
                    <div className='header-button-container ing'>
                        <h3 id='ingredients'>Ingredients</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                {recipe.ingredients.length > 0 &&
                                <>
                                    {showEditIng ?
                                        <span onClick={() => setShowEditIng(!showEditIng)} className='done'>Done Editing</span>
                                    :
                                        <div onClick={() => setShowEditIng(!showEditIng)} className='edit-pen'><i className="fa-solid fa-pen"></i></div>
                                    }
                                    {showAddIng ?
                                        <span onClick={() => setShowAddIng(!showAddIng)} className='done'>Done Adding</span>
                                    :
                                        <div onClick={() => setShowAddIng(!showAddIng)}><i className="fa-solid fa-plus"></i></div>
                                    }
                                </>
                                }
                            </div>
                        }
                    </div>

                    <div>
                        {/* if your recipe and no ingredients, prompt to add some ingredients */}
                        {sessionUser && sessionUser.id === recipe.user.id && !recipe.ingredients.length && !showAddIng &&
                            <div className='add-info' onClick={() => setShowAddIng(!showAddIng)}>
                                <h2>Step 2. Click here to add Ingredients to your recipe!</h2>
                            </div>
                        }
                        <ul>
                            {ordered_ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <Ingredient
                                        ingredient={ingredient}
                                        recipe={recipe}
                                        showEditIng={showEditIng}
                                        setShowEditIng={setShowEditIng}
                                        measurementUnits={measurementUnits}
                                        />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* MAKE INTO MODAL */}
                    {showAddIng &&
                        <div>
                            <NewIngredientForm recipe_id={recipe.id} measurementUnits={measurementUnits} edit={true}/>
                        </div>
                    }
                </div>

                {/* Instructions */}
                <div>
                    <div className='header-button-container inst'>
                        <h3 id='instructions'>Instructions</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                {recipe.instructions.length > 0 &&
                                <>
                                    {showEditInst ?
                                        <span onClick={() => setShowEditInst(!showEditInst)} className='done'>Done</span>
                                    :
                                        <div onClick={() => setShowEditInst(!showEditInst)}><i className="fa-solid fa-pen"></i></div>
                                    }
                                    <div onClick={() => setShowAddInst(!showAddInst)}><i className="fa-solid fa-plus"></i></div>
                                </>
                                }
                            </div>
                        }
                    </div>
                        <div>
                            {sessionUser && sessionUser.id === recipe.user.id && !recipe.instructions.length &&
                                <div className='add-info' onClick={() => setShowAddInst(!showAddInst)}>
                                    <h2>Step 3. Click here to add Instructions to your recipe!</h2>
                                </div>
                            }
                            {ordered_instructions.map(instruction => (
                                <Instruction
                                    key={instruction.id}
                                    instruction={instruction}
                                    recipe_id={recipe.id}
                                    showEditInst={showEditInst}
                                    setShowEditInst={setShowEditInst}
                                    currentLength={recipe.instructions.length}
                                    />
                            ))}
                        </div>
                    {showAddInst &&
                        <div>
                            <NewInstructionForm
                                recipe_id={recipe.id}
                                existing_list_order={recipe.instructions.length}
                                edit={true}/>
                        </div>
                    }
                </div>
                <h2 id='comments'>Check out what people are saying!</h2>
                <CommentSection recipe={recipe} />
                {/* <button onClick={() => ingRef.current.scrollIntoView({ behavior: 'smooth' })}>Test</button> */}
            </>
            :
            <p>Looks like there's nothing here!</p>
            }
        </div>
    )
}

export default SingleRecipe

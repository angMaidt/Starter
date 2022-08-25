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
    const commentRef = useRef()
    const recipeRef = useRef()
    const recipe = useSelector(state => state.recipes[id])
    const sessionUser = useSelector(state => state.session.user)

    //edit recipe state
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
            await dispatch(deleteRecipeThunk(recipe))
            history.push('/my-recipes')

        } catch (e) {
            return window.alert(`Delete failed! Please try again.`)
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
    // const comments = document.getElementById('comments')
    // const headerOffset = 45
    // const elementPosition = comments.getBoundingClientRect().top
    // const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    // window.scrollTo({
    //     top: offsetPosition,
    //     behavior: 'smooth'
    // })

    //calculate rating
    const find_average = (recipe) => {
        //find the avg
        //add all comment.ratings together
        //divide by length
        //return
        let sum = 0
        recipe.comments.forEach(comment => {
            sum += comment.rating
        })
        return sum/recipe.comments.length
    }

    //time conversion variables
    let active_time_converted, prep_time_converted, bake_time_converted, total_time_converted
    if (recipe) {
        active_time_converted = ms_converter(recipe.active_time)
        prep_time_converted = ms_converter(recipe.prep_time)
        bake_time_converted = ms_converter(recipe.bake_time)
        total_time_converted = ms_converter(recipe.active_time + recipe.prep_time + recipe.bake_time)
    }


    return (
        <div className='view-container single-recipe-view'>
            {recipe ?
            <>
                <div className='recipe-header-container'>
                    <h1 style={{ 'fontWeight': '500' }}>{recipe.title}</h1>
                    <div className='recipe-ref-container'>
                        <div className='line-container'>
                            <div className='line'></div>
                        </div>
                        <div
                            className='jump-to-recipe'
                            onClick={() => recipeRef.current.scrollIntoView({ behavior: 'smooth' })}
                            >
                            <div className='circle'>
                                <i className="fa-solid fa-arrow-down"></i>
                            </div>
                            <h5>Jump to Recipe</h5>
                            <div className='circle'>
                                <i className="fa-solid fa-arrow-down"></i>
                            </div>
                        </div>
                        <div className='line-container'>
                            <div className='line'></div>
                        </div>
                    </div>
                    <p id='recipe-description'>{recipe.description}</p>
                    <div className='posted-recipe'>
                        <div className='posted-info'>
                            {/* <div className='round-profile-pic'>
                                <img src={recipe.user.profile_pic} alt='profile-pic' />
                            </div> */}
                            <h5>by {recipe.user.username}</h5>
                            {recipe.created_at === recipe.updated_at ?
                                <span>Published {recipe.created_at.split(' ').slice(1, 4).join(' ')}</span>
                                :
                                <span>Updated {recipe.updated_at.split(' ').slice(1, 4).join(' ')}</span>
                            }
                        </div>
                        <div
                            className='recipe-comment-info bubble bubble-bottom-left'
                            onClick={() => commentRef.current.scrollIntoView({ behavior: 'smooth' })}
                            >
                            {/* <span>Rating</span>
                            <p>{find_average(recipe)} stars from {recipe.comments.length} reviews</p> */}
                            <div>{recipe.comments.length}<h6>comments</h6></div>
                        </div>
                    </div>
                </div>
                <div className='single-image-container'>
                    <img src={recipe.image_url} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src ='../../../../../static/default-bread.jpg'
                    }} alt={`recipe-${recipe.id}`} />
                </div>
                <div className='header-button-container' ref={recipeRef} style={{ 'scrollMarginTop': '100px' }}>
                    {/* <h3 className='wavy-underline'>Recipe Facts</h3> */}
                    {/* {sessionUser && sessionUser.id === recipe.user.id &&
                    <div className='edit-button-container'>
                        <div onClick={() => setShowEditForm(!showEditForm)} title='Edit Recipe'>
                            <i className="fa-solid fa-pen"></i>
                        </div>
                        <div onClick={handleDelete} title='Delete Recipe'><i className="fa-solid fa-trash-can"></i></div>
                    </div>
                    } */}
                </div>
                {!showEditForm ?
                    <div className='recipe-facts'>
                        <div className='facts-header-container'>
                            <div>
                                <h3 className='facts-header'>Recipe Facts</h3>
                                <img
                                    src='../../../../static/icon-ketchup-squirt.svg'
                                    alt='icon-ketchup'
                                    id='icon-ketchup'/>
                            </div>
                            {sessionUser && sessionUser.id === recipe.user.id &&
                                <div className='edit-button-container'>
                                    <div onClick={() => setShowEditForm(!showEditForm)} title='Edit Recipe'>
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                    <div onClick={handleDelete} title='Delete Recipe'><i className="fa-solid fa-trash-can"></i></div>
                                </div>
                                }
                        </div>
                        <div className='facts'>
                            <div className='facts-left'>
                                <img
                                    src='../../../../static/icon-timer.svg'
                                    alt='icon-timer'
                                    id='icon-timer'
                                    title='time'/>
                                <div>
                                    <h3>Active: {active_time_converted[0] <= 0 ? null : active_time_converted[0] + ' hrs '}
                                        {active_time_converted[1] <= 0 ? null : active_time_converted[1] + ' mins'}</h3>
                                    <h3>Proof: {prep_time_converted[0] <= 0 ? null : prep_time_converted[0] + ' hrs '}
                                        {prep_time_converted[1] <= 0 ? null : prep_time_converted[1] + ' mins'}</h3>
                                    <h3>Baking: {bake_time_converted[0] <= 0 ? null : bake_time_converted[0] + ' hrs '}
                                        {bake_time_converted[1] <= 0 ? null : bake_time_converted[1] + ' mins'}</h3>
                                    <h3 className='yellow-highlight'>Total Time: {total_time_converted[0] <= 0 ? null : total_time_converted[0] + ' hrs '}
                                        {total_time_converted[1] <= 0 ? null : total_time_converted[1] + ' mins'}</h3>
                                </div>
                            </div>
                            <div className='facts-right'>
                                <img
                                    src='../../../../static/icon-servings.svg'
                                    alt='icon-servings'
                                    id='icon-servings'
                                    title='servings'/>
                                <div className='text-right'>
                                    <h3>Baking Temp: {recipe.baking_temp} °F</h3>
                                    <h3 className='yellow-highlight'>Total Yield: {recipe.total_yield}</h3>
                                </div>
                                {/* {sessionUser && sessionUser.id === recipe.user.id &&
                                <div className='edit-button-container'>
                                    <div onClick={() => setShowEditForm(!showEditForm)} title='Edit Recipe'>
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                    <div onClick={handleDelete} title='Delete Recipe'><i className="fa-solid fa-trash-can"></i></div>
                                </div>
                                } */}
                            </div>
                        </div>
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
                    <div className='header-button-container-ing'>
                        <h3 id='ingredients' className='straight-underline'>Ingredients</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                {recipe.ingredients.length > 0 &&
                                <>
                                    {showEditIng ?
                                        <span
                                            onClick={() => setShowEditIng(!showEditIng)}
                                            className='done'>Done Editing</span>
                                    :
                                        <div
                                            onClick={() => setShowEditIng(!showEditIng)}
                                            className='edit-pen'
                                            title='Edit Ingredients'>
                                                <i className="fa-solid fa-pen"></i>
                                        </div>
                                    }
                                    {showAddIng ?
                                        <span
                                            onClick={() => setShowAddIng(!showAddIng)}
                                            className='done'>Done Adding</span>
                                    :
                                        <div
                                            onClick={() => setShowAddIng(!showAddIng)}
                                            title='Add Ingredients'><i className="fa-solid fa-plus"></i>
                                        </div>
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
                    {showAddIng &&
                        <div>
                            <NewIngredientForm
                                recipe_id={recipe.id}
                                measurementUnits={measurementUnits}
                                edit={true}/>
                        </div>
                    }
                </div>

                {/* Instructions */}
                <div>
                    <div className='header-button-container inst'>
                        <h3 id='instructions' className='straight-underline'>Instructions</h3>
                        {sessionUser && sessionUser.id === recipe.user.id &&
                            <div className='edit-button-container'>
                                {recipe.instructions.length > 0 &&
                                <>
                                    {showEditInst ?
                                        <span
                                            onClick={() => setShowEditInst(!showEditInst)}
                                            className='done'>Done editing</span>
                                    :
                                        <div
                                            onClick={() => setShowEditInst(!showEditInst)}
                                            title='Edit Instructions'>
                                            <i className="fa-solid fa-pen"></i>
                                        </div>
                                    }
                                    {showAddInst ?
                                        <span onClick={() => setShowAddInst(!showAddInst)} className='done'>Done Adding</span>
                                    :
                                        <div
                                            onClick={() => setShowAddInst(!showAddInst)}
                                            title='Add Instructions'>
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    }
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
                <h2 id='comments'
                    ref={commentRef}
                    style={{ 'scrollMarginTop': '100px' }}
                    >Check out what people are saying!</h2>
                <div className='page-header-underline'></div>
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

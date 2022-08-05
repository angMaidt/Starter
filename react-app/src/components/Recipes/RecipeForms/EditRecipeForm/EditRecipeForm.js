import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { editRecipeThunk } from '../../../../store/recipe'
import EditIngredientForm from '../EditIngredientForm/EditIngredientForm'
import EditInstructionForm from '../EditInstructionForm/EditInstructionForm'
import NewIngredientForm from '../NewIngredientForm/NewIngredientForm'
import NewInstructionForm from '../NewInstructionForm/NewInstructionForm'

function EditRecipeForm({ recipe, setShowEditForm, ordered_ingredients, ordered_instructions }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showAddInstructionForm, setShowAddInstructionForm] = useState(false)

    const ms_converter = (ms) => {
        let mins = ms % 3600000
        let hrs = ms - mins
        let secs = mins % 60000
        mins = mins - secs
        hrs = hrs/3600000
        mins = mins/60000
        return [hrs, mins]
    }
    // console.log(3488500 % 3,600,000)
    // console.log(ms_converter(3488500))

    const [title, setTitle] = useState(recipe.title)
    const [description, setDescription] = useState(recipe.description)
    const [image_url, setImage_url] = useState(recipe.image_url)

    const [active_time_hrs, setActive_time_hrs] = useState(ms_converter(recipe.active_time)[0])
    const [active_time_mins, setActive_time_mins] = useState(ms_converter(recipe.active_time)[1])

    const [ferment_time_hrs, setFerment_time_hrs] = useState(ms_converter(recipe.active_time)[0]) //note, change prep time to proof time in db
    const [ferment_time_mins, setFerment_time_mins] = useState(ms_converter(recipe.active_time)[1]) //note, change prep time to proof time in db

    const [bake_time_hrs, setBake_time_hrs] = useState(ms_converter(recipe.active_time)[0])
    const [bake_time_mins, setBake_time_mins] = useState(ms_converter(recipe.active_time)[1])

    const [baking_temp, setBaking_temp] = useState(recipe.baking_temp)

    const [baking_temp_system, setBaking_temp_system] = useState('fahrenheit')
    const [total_yield, setTotal_yield] = useState(recipe.total_yield)
    const [measurementUnits, setMeasurementUnits] = useState('')
    const [recipe_id, setRecipe_id] = useState(recipe.id)
    // console.log(recipe_id)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        async function fetchUnits() {
            const res = await fetch('/api/recipes/units')
            const data = await res.json()
            setMeasurementUnits(data.units)
        }
        fetchUnits()
    }, [])

    //convert before sending back
    const convert_to_ms = (hrs, mins) => {
        if (!hrs) hrs = 0
        if (!mins) mins = 0

        const min_ms = mins*60000
        const hr_ms = hrs*3600000
        return hr_ms + min_ms
    }

    const convert_to_celsius = (temp, system) => {
        if (system === 'fahrenheit') {
            const to_celsius = Math.floor((temp - 32)*(5/9))
            return to_celsius
        }
        return Number(temp)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)

        //convert to ms before sending to db
        const active_time = convert_to_ms(active_time_hrs, active_time_mins)
        const ferment_time = convert_to_ms(ferment_time_hrs, ferment_time_mins)
        const bake_time = convert_to_ms(bake_time_hrs, bake_time_mins)

        //convert to celsius before sending back
        const degrees_celsius = convert_to_celsius(baking_temp, baking_temp_system)

        const payload = {
            id: recipe.id,
            user_id: sessionUser.id,
            title,
            image_url,
            description,
            active_time,
            prep_time: ferment_time,
            bake_time,
            baking_temp: degrees_celsius,
            total_yield
        }

        try {
            const data = await dispatch(editRecipeThunk(payload))
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    // let list_length
    // if (recipe) {
    //     list_length = recipe.ingredients.length()
    // }

    // console.log(list_length)
    return (
        <>
            <h3>Edit Recipe!</h3>
            <form className='recipe-form' onSubmit={handleSubmit}>
                <div className='recipe-input-container'>
                    <div className="input-container">
                        <label>Title</label>
                        <input
                            type='text'
                            placeholder='Title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Description</label>
                        <input
                            type='text'
                            placeholder='Description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Image Link</label>
                        <input
                            type='text'
                            placeholder='Link an image that ends in .jpg, .jpeg, .png, or .gif'
                            // required
                            value={image_url}
                            onChange={(e) => setImage_url(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Hands On Time</label>
                        <input
                            type='text'
                            placeholder="Hours"
                            // required
                            value={active_time_hrs}
                            onChange={(e) => setActive_time_hrs(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Minutes"
                            // required
                            value={active_time_mins}
                            onChange={(e) => setActive_time_mins(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Proofing Time</label>
                        <input
                            type='text'
                            placeholder="Hours"
                            // required
                            value={ferment_time_hrs}
                            onChange={(e) => setFerment_time_hrs(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Mins"
                            // required
                            value={ferment_time_mins}
                            onChange={(e) => setFerment_time_mins(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Bake Time</label>
                        <input
                            type='text'
                            placeholder="Hours"
                            // required
                            value={bake_time_hrs}
                            onChange={(e) => setBake_time_hrs(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Mins"
                            // required
                            value={bake_time_mins}
                            onChange={(e) => setBake_time_mins(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Baking Temp</label>
                        <input
                            type='text'
                            placeholder="400"
                            required
                            value={baking_temp}
                            onChange={(e) => setBaking_temp(e.target.value)}
                        />
                        <select
                            type='string'
                            placeholder='°F'
                            required
                            value={baking_temp_system}
                            onChange={(e) => setBaking_temp_system(e.target.value)}
                        >
                            <option value='fahrenheit'>°F</option>
                            <option value='celsius'>°C</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label>Yield</label>
                        <input
                            type='text'
                            placeholder="e.g. 1 loaf, 12 rolls"
                            required
                            value={total_yield}
                            onChange={(e) => setTotal_yield(e.target.value)}
                        />
                    </div>
                </div>
                <button>Submit!</button>
            </form>
            <h3>Edit Ingredients</h3>
            {ordered_ingredients.map(ingredient => (
                <EditIngredientForm key={ingredient.id} measurementUnits={measurementUnits} ingredient={ingredient} recipe_id={recipe.id}/>
                ))}
            {showAddForm && <NewIngredientForm measurementUnits={measurementUnits} recipe_id={recipe.id}/>}
            {!showAddForm ?
            <button onClick={() => setShowAddForm(true)}>Add Ingredient</button>
            :
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
            }
            <h3>Edit Instructions</h3>
            {ordered_instructions.map(instruction => (
                <>
                    <EditInstructionForm key={instruction.id} instruction={instruction} recipe_id={recipe.id} />
                </>
            ))}
            {}
            {showAddInstructionForm && <NewInstructionForm recipe_id={recipe.id} />}
            {!showAddInstructionForm ?
                <button onClick={() => setShowAddInstructionForm(true)}>Add Instruction</button>
                :
                <button onClick={() => setShowAddInstructionForm(false)}>Cancel</button>
            }
        {/* <button onClick={setShowEditForm(false)}>Done!</button> */}
        </>
    )
}

export default EditRecipeForm

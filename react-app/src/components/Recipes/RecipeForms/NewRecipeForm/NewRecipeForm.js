import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { postRecipeThunk } from '../../../../store/recipe'
import NewIngredientForm from '../NewIngredientForm/NewIngredientForm'
import NewInstructionForm from '../NewInstructionForm/NewInstructionForm'

function NewRecipeForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image_url, setImage_url] = useState('')

    const [active_time_mins, setActive_time_mins] = useState('')
    const [active_time_hrs, setActive_time_hrs] = useState('')

    const [ferment_time_mins, setFerment_time_mins] = useState('') //note, change prep time to ferment time in db
    const [ferment_time_hrs, setFerment_time_hrs] = useState('') //note, change prep time to ferment time in db

    const [bake_time_mins, setBake_time_mins] = useState('')
    const [bake_time_hrs, setBake_time_hrs] = useState('')

    const [baking_temp, setBaking_temp] = useState('')
    const [baking_temp_system, setBaking_temp_system] = useState('fahrenheit')

    const [total_yield, setTotal_yield] = useState('')
    const [measurementUnits, setMeasurementUnits] = useState('')
    const [recipe_id, setRecipe_id] = useState('')
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

    //converts time to ms before sending to db
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

        // convert to celsius before sending back
        const degrees_celsius = convert_to_celsius(baking_temp, baking_temp_system)

        const payload = {
            user_id: sessionUser.id,
            title,
            image_url,
            description,
            active_time,
            prep_time: ferment_time,
            bake_time: degrees_celsius,
            baking_temp,
            total_yield
        }

        try {
            const data = await dispatch(postRecipeThunk(payload))
            alert('Recipe Submitted!')
            setRecipe_id(data.id)
            // history.push('/recipes')
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            <h3>Recipe Body</h3>
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
                        <label>Ferment Time</label>
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
            <NewIngredientForm recipe_id={recipe_id} measurementUnits={measurementUnits}/>
            <NewInstructionForm recipe_id={recipe_id}/>
        </>
    )
}

export default NewRecipeForm

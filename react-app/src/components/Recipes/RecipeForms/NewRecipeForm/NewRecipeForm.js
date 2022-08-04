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
    const [active_time, setActive_time] = useState('')
    const [active_time_unit, setActive_time_unit] = useState('')
    const [proofing_time, setProofing_time] = useState('') //note, change prep time to proof time in db
    const [proofing_time_unit, setProofing_time_unit] = useState('') //note, change prep time to proof time in db
    const [bake_time, setBake_time] = useState('')
    const [bake_time_unit, setBake_time_unit] = useState('')
    const [baking_temp, setBaking_temp] = useState('')
    const [baking_temp_system, setBaking_temp_system] = useState('')
    const [total_yield, setTotal_yield] = useState('')
    const [measurementUnits, setMeasurementUnits] = useState('')
    const [recipe_id, setRecipe_id] = useState('')
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

    //converts time to ms before sending to db
    const convert_to_ms = (time, unit) => {
        if(unit === 'mins') {
            const min_ms = time*60000
            return min_ms
        } else if (unit === 'hrs'){
            const hr_ms = time*3600000
            return hr_ms
        }
        return
    }

    const convert_to_celsius = (temp, system) => {
        if (system === 'fahrenheit') {
            const to_celsius = Math.floor((temp - 32)*(5/9))
            return to_celsius
        }
        return temp
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)

        //convert to ms before sending to db
        const active_time_ms = convert_to_ms(active_time, active_time_unit)
        const proofing_time_ms = convert_to_ms(proofing_time, proofing_time_unit)
        const bake_time_ms = convert_to_ms(bake_time, bake_time_unit)

        //convert to celsius before sending back
        const degrees_celsius = convert_to_celsius(baking_temp, baking_temp_system)

        const payload = {
            user_id: sessionUser.id,
            title,
            image_url,
            description,
            active_time: active_time_ms,
            prep_time: proofing_time_ms,
            bake_time: bake_time_ms,
            baking_temp: degrees_celsius,
            total_yield
        }

        try {
            const data = await dispatch(postRecipeThunk(payload))
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
                            placeholder="How long did you spend mixing and shaping? It's okay to approximate."
                            required
                            value={active_time}
                            onChange={(e) => setActive_time(e.target.value)}
                        />
                        <select
                            type='text'
                            placeholder='mins'
                            required
                            value={active_time_unit}
                            onChange={(e) => setActive_time_unit(e.target.value)}
                        >
                            <option value='mins'>mins</option>
                            <option value='hrs'>hrs</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label>Proofing Time</label>
                        <input
                            type='text'
                            placeholder="How many hours did you let the breads proof? It's okay to approximate."
                            required
                            value={proofing_time}
                            onChange={(e) => setProofing_time(e.target.value)}
                        />
                    </div>
                    <select
                        type='text'
                        placeholder='mins'
                        required
                        value={proofing_time_unit}
                        onChange={(e) => setProofing_time_unit(e.target.value)}
                        >
                            <option value='mins'>mins</option>
                            <option value='hrs'>hrs</option>
                        </select>
                    <div className="input-container">
                        <label>Bake Time</label>
                        <input
                            type='text'
                            placeholder="How long did you bake the bread?"
                            required
                            value={bake_time}
                            onChange={(e) => setBake_time(e.target.value)}
                        />
                        <select
                            type='text'
                            placeholder='mins'
                            required
                            value={bake_time_unit}
                            onChange={(e) => setBake_time_unit(e.target.value)}
                        >
                            <option value='mins'>mins</option>
                            <option value='hrs'>hrs</option>
                        </select>
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

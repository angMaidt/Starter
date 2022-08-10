import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { SystemContext } from '../../../../context/SystemContext'
// import { useHistory } from "react-router-dom"
import './EditRecipeForm.css'

import { editRecipeThunk } from '../../../../store/recipe'

function EditRecipeForm({ recipe, setShowEditForm, ordered_ingredients, ordered_instructions }) {
    // const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const { system } = useContext(SystemContext)

    // const [showAddForm, setShowAddForm] = useState(false)
    // const [showAddInstructionForm, setShowAddInstructionForm] = useState(false)

    const ms_converter = (ms) => {
        // let mins = ms % 3600000
        // let hrs = ms - mins
        // let secs = mins % 60000
        // mins = mins - secs
        // hrs = hrs/3600000
        // mins = mins/60000
        let hrs = Math.floor(ms / 3600000)
        let mins = Math.floor((ms - (hrs * 3600000)) / 60000)
        return [hrs, mins]
    }
    // console.log(ms_converter(3488500))

    const [title, setTitle] = useState(recipe.title)
    const [description, setDescription] = useState(recipe.description)
    const [image_url, setImage_url] = useState(recipe.image_url)

    const [active_time_hrs, setActive_time_hrs] = useState(ms_converter(recipe.active_time)[0])
    const [active_time_mins, setActive_time_mins] = useState(ms_converter(recipe.active_time)[1])

    const [ferment_time_hrs, setFerment_time_hrs] = useState(ms_converter(recipe.prep_time)[0]) //note, change prep time to proof time in db
    const [ferment_time_mins, setFerment_time_mins] = useState(ms_converter(recipe.prep_time)[1]) //note, change prep time to proof time in db

    const [bake_time_hrs, setBake_time_hrs] = useState(ms_converter(recipe.bake_time)[0])
    const [bake_time_mins, setBake_time_mins] = useState(ms_converter(recipe.bake_time)[1])

    // const convert_to_fahrenheit = (celsius) => {
    //     return Math.round(celsius * (9/5) + 32)
    // }

    const [baking_temp, setBaking_temp] = useState(recipe.baking_temp)

    // const [baking_temp_system, setBaking_temp_system] = useState('fahrenheit')

    //Checks context and sets system
    // system ? () => setBaking_temp_system('celsius') : () => setBaking_temp_system('fahrenheit')

    const [total_yield, setTotal_yield] = useState(recipe.total_yield)

    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const filetypes_regex = /\.(gif|jpe?g|png|webp)$/

    //validations
    useEffect(() => {
        let errors = []

        if (!title.length || title.length < 5) errors.push('Uh oh, your title is too short! Make it over 5 characters.')
        if (title.length > 50) errors.push('Uh oh, your title is too long! Make it less than 50 characters.')

        if (!description || description.length < 5) errors.push('Uh oh, your description is too short! Make it over 5 characters.')
        if (description.length > 2000) errors.push('Uh oh, your description is too long! Make it less than 2000 characters.')

        if (!image_url) errors.push('Please enter an image file for your recipe.')
        if (!(filetypes_regex).test(image_url)) errors.push('Please enter a filename ending in .jpg, .jpeg, .png, .gif, or .webp.')

        if (isNaN(active_time_mins) || isNaN(active_time_hrs)) errors.push('Please enter numbers only into active time fields!')
        if (active_time_mins < 0 || active_time_hrs < 0) errors.push('Looks like you tried to enter a negative number for active time. While impressive, not very realistic.')
        if (active_time_mins > 59) errors.push('Looks like you tried to enter 60 or more in the active time minutes! Please use hour field instead.')
        if (active_time_hrs > 100) errors.push('Looks like you entered over 100 hours active time on this recipe. That seems a little excessive, no?.')

        if (isNaN(ferment_time_mins) || isNaN(ferment_time_hrs)) errors.push('Please enter numbers only into ferment time fields!')
        if (ferment_time_mins < 0 || ferment_time_hrs < 0) errors.push('Looks like you tried to enter a negative number for ferment time. While impressive, not very realistic.')
        if (ferment_time_mins > 59) errors.push('Looks like you tried to enter 60 or more in the ferment time minutes! Please use hour field instead.')
        if (ferment_time_hrs > 500) errors.push('Looks like you entered over 500 hours ferment time on this recipe. That seems a little excessive, no?.')

        if (isNaN(bake_time_mins) || isNaN(bake_time_hrs)) errors.push('Please enter numbers only into bake time fields!')
        if (bake_time_mins < 0 || bake_time_hrs < 0) errors.push('Looks like you tried to enter a negative number for bake time. While impressive, not very realistic.')
        if (bake_time_mins > 59) errors.push('Looks like you tried to enter 60 or more in the bake time minutes! Please use hour field instead.')
        if (bake_time_hrs > 500) errors.push('Looks like you entered over 500 hours bake time on this recipe. That seems a little excessive, no?.')

        if (!total_yield || total_yield.length < 3) errors.push('Total yield is too short! Make it over 3 characters.')
        if (total_yield.length > 50) errors.push('Total yield is too long! Make it less than 50 characters.')

        if (isNaN(baking_temp)) errors.push('Please enter numbers only into baking temperature fields!')
        if (!baking_temp || baking_temp < 0) errors.push('Please enter a number over 0 for your bake temperature!')
        if (baking_temp > 1000) errors.push('Did you enter a number over 1000 for bake temperature? I am skeptical, to say the least.')

        setValidationErrors(errors)
    }, [title, description, image_url, total_yield, active_time_mins, active_time_hrs, ferment_time_mins, ferment_time_hrs, bake_time_mins, bake_time_hrs, baking_temp, ])


    //convert before sending back
    const convert_to_ms = (hrs, mins) => {
        if (!hrs) hrs = 0
        if (!mins) mins = 0

        const min_ms = mins*60000
        const hr_ms = hrs*3600000
        return hr_ms + min_ms
    }

    // const convert_to_celsius = (temp) => {
    //     return (temp - 32)*(5/9)
    // }
    // console.log(convert_to_celsius(348))

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (validationErrors.length) return alert('Cannot Submit!')

        //convert to ms before sending to db
        const active_time = convert_to_ms(active_time_hrs, active_time_mins)
        const ferment_time = convert_to_ms(ferment_time_hrs, ferment_time_mins)
        const bake_time = convert_to_ms(bake_time_hrs, bake_time_mins)

        //convert to celsius before sending back
        // let degrees_celsius
        // if (!system) {
        //     degrees_celsius = convert_to_celsius(baking_temp)
        // } else {
        //     degrees_celsius = baking_temp
        // }
        // const degrees_celsius = convert_to_celsius(baking_temp)

        const payload = {
            id: recipe.id,
            user_id: sessionUser.id,
            title,
            image_url,
            description,
            active_time,
            prep_time: ferment_time,
            bake_time,
            baking_temp,
            total_yield
        }

        try {
            const data = await dispatch(editRecipeThunk(payload))
            if (data) setShowEditForm(false)
        } catch (e) {
            // setValidationErrors(e.errors)
            // console.log()
        }
    }

    return (
        <>
            <h3>Edit Recipe!</h3>
            {validationErrors.length > 0 &&
            <ul className='errors'>
                {validationErrors.map(error => (
                    <li className='error' key={error}>{error}</li>
                ))}
            </ul>
        }
            <form className='edit-recipe-form' onSubmit={handleSubmit}>
                <div className='recipe-input-container'>
                    <div className="input-container">
                        <input
                            type='text'
                            placeholder='Title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            <label>Title:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type='text'
                            placeholder='Description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                            <label>Description:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type='text'
                            placeholder='Link an image that ends in .jpg, .jpeg, .png, or .gif'
                            // required
                            value={image_url}
                            onChange={(e) => setImage_url(e.target.value)}
                            />
                            <label>Image Link:</label>
                    </div>
                    <div className="input-container time">
                        <div>
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
                        <label>Hands On Time</label>
                    </div>
                    <div className="input-container time">
                        <div>
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
                        <label>Proofing Time:</label>
                    </div>
                    <div className="input-container time">
                        <div>
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
                        <label>Bake Time:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type='text'
                            placeholder="400"
                            required
                            value={baking_temp}
                            onChange={(e) => setBaking_temp(e.target.value)}
                            />
                        <label>Baking Temp:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type='text'
                            placeholder="e.g. 1 loaf, 12 rolls"
                            required
                            value={total_yield}
                            onChange={(e) => setTotal_yield(e.target.value)}
                            />
                        <label>Yield:</label>
                    </div>
                </div>
                {validationErrors.length > 0 ?
                        <div className='submit-edit-button-container'>
                            <h3>Please fix errors before submitting.</h3>
                        </div>
                    :
                        <div className='submit-edit-button-container'>
                            <h3>Save</h3>
                            <button type='submit' className='arrow-button' >
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </div>
                    }
            </form>
        </>
    )
}

export default EditRecipeForm

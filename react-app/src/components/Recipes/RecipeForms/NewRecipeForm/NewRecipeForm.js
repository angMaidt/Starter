import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
// import { HashLink } from 'react-router-hash-link'
import { postRecipeThunk } from '../../../../store/recipe'
// import NewIngredientForm from '../NewIngredientForm/NewIngredientForm'
// import NewInstructionForm from '../NewInstructionForm/NewInstructionForm'
import { getRecipesThunk } from '../../../../store/recipe'
import './NewRecipeForm.css'

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
    // const [baking_temp_system, setBaking_temp_system] = useState('fahrenheit')

    const [total_yield, setTotal_yield] = useState('')
    const [measurementUnits, setMeasurementUnits] = useState('')
    const [recipe_id, setRecipe_id] = useState('')

    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [hasCreated, setHasCreated] = useState(false)

    useEffect(() => {
        async function fetchUnits() {
            const res = await fetch('/api/recipes/units')
            const data = await res.json()
            setMeasurementUnits(data.units)
        }
        fetchUnits()
    }, [])

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

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

        if (!active_time_mins && !active_time_hrs) errors.push('Please enter an active time in minutes, hours, or both.')
        if (isNaN(active_time_mins) || isNaN(active_time_hrs)) errors.push('Please enter numbers only into active time fields!')
        if (active_time_mins < 0 || active_time_hrs < 0) errors.push('Looks like you tried to enter a negative number for active time. While impressive, not very realistic.')
        if (active_time_mins > 59) errors.push('Looks like you tried to enter 60 or more in the active time minutes! Please use hour field instead.')
        if (active_time_hrs > 100) errors.push('Looks like you entered over 100 hours active time on this recipe. That seems a little excessive, no?.')

        if (!ferment_time_mins && !ferment_time_hrs) errors.push('Please enter a ferment time in minutes, hours, or both.')
        if (isNaN(ferment_time_mins) || isNaN(ferment_time_hrs)) errors.push('Please enter numbers only into ferment time fields!')
        if (ferment_time_mins < 0 || ferment_time_hrs < 0) errors.push('Looks like you tried to enter a negative number for ferment time. While impressive, not very realistic.')
        if (ferment_time_mins > 59) errors.push('Looks like you tried to enter 60 or more in the ferment time minutes! Please use hour field instead.')
        if (ferment_time_hrs > 500) errors.push('Looks like you entered over 500 hours ferment time on this recipe. That seems a little excessive, no?.')

        if (!bake_time_mins && !bake_time_hrs) errors.push('Please enter a bake time in minutes, hours, or both.')
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

    //converts time to ms before sending to db
    const convert_to_ms = (hrs, mins) => {
        if (!hrs) hrs = 0
        if (!mins) mins = 0

        const min_ms = mins*60000
        const hr_ms = hrs*3600000
        return hr_ms + min_ms
    }

    //convert to c before storing in db
    // const convert_to_celsius = (temp, system) => {
    //     if (system === 'fahrenheit') {
    //         const to_celsius = Math.floor((temp - 32)*(5/9))
    //         return to_celsius
    //     }
    //     return Number(temp)
    // }

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (validationErrors.length) return

        //convert to ms before sending to db
        const active_time = convert_to_ms(active_time_hrs, active_time_mins)
        const ferment_time = convert_to_ms(ferment_time_hrs, ferment_time_mins)
        const bake_time = convert_to_ms(bake_time_hrs, bake_time_mins)

        // convert to celsius before sending back
        // const degrees_celsius = convert_to_celsius(baking_temp, baking_temp_system)

        const payload = {
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
            const data = await dispatch(postRecipeThunk(payload))
            if (data) {
                // alert('Recipe Submitted!')
                setRecipe_id(data.id)
                setHasCreated(true)
                setTitle('')
                setDescription('')
                setImage_url('')
                setActive_time_mins('')
                setActive_time_hrs('')
                setFerment_time_mins('')
                setFerment_time_hrs('')
                setBake_time_mins('')
                setBake_time_hrs('')
                setBaking_temp('')
                // setBaking_temp_system('fahrenheit')
                setTotal_yield('')
                setHasSubmitted(false)

                history.push(`/recipes/${data.id}`)
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    //offsets hashlink redirect
    // const scrollWithOffset = (el) => {
    //     const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    //     const yOffset = -80;
    //     window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    // }

    return (
        <div className='form-container'>
            {/* <HashLinkObserver /> */}
            <h3 id='new-recipe-header'>Give us some info about your recipe! We'll visit the recipe page next, you can add ingredients and instructions there.</h3>
            {hasSubmitted && validationErrors.length > 0 &&
            <div className='error-container'>
                <h3 className='error'>Please fix errors before continuing!</h3>
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            </div>
            }
            <form className='recipe-form' onSubmit={handleSubmit}>
                <div className='recipe-input-container'>
                    {/* <div className='recipe-top'> */}
                    <div className="input-container">
                        <input
                            name='title'
                            type='text'
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ 'width': '80%' }}
                        />
                        <label for='title'><span className='asterisk'>*</span>Title: </label>
                    </div>
                    <div className="input-container">
                        <textarea
                            name='description'
                            // type='text'
                            placeholder='Please provide a short description of your bread.'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label for='description'><span className='asterisk'>*</span>Description</label>
                    </div>
                    <div className="input-container">
                        <input
                            name='image'
                            type='text'
                            placeholder='yummy-bread.jpg'
                            value={image_url}
                            onChange={(e) => setImage_url(e.target.value)}
                            style={{ 'width': '80%' }}
                        />
                        <label for='image'><span className='asterisk'>*</span>Image Link</label>
                    </div>
                    {/* </div> */}
                    <div className="input-container time">
                        <div>
                            <input
                                name='active-time'
                                type='text'
                                placeholder="Hours"
                                // required
                                value={active_time_hrs}
                                onChange={(e) => setActive_time_hrs(e.target.value)}
                            />
                            <input
                                name='active-time'
                                type='text'
                                placeholder="Minutes"
                                // required
                                value={active_time_mins}
                                onChange={(e) => setActive_time_mins(e.target.value)}
                            />
                        </div>
                        <label for='active-time'l><span className='asterisk'>*</span>Hands On Time</label>
                    </div>
                    <div className="input-container time">
                        {/* <div> */}
                        <div>
                            <input
                                name='ferment'
                                type='text'
                                placeholder="Hours"
                                // required
                                value={ferment_time_hrs}
                                onChange={(e) => setFerment_time_hrs(e.target.value)}
                            />
                            <input
                                name='ferment'
                                type='text'
                                placeholder="Minutes"
                                // required
                                value={ferment_time_mins}
                                onChange={(e) => setFerment_time_mins(e.target.value)}
                            />
                        </div>
                        <label for='ferment'><span className='asterisk'>*</span>Ferment Time</label>
                        {/* </div> */}
                    </div>
                    <div className="input-container time">
                        <div>
                            <input
                                name='bake-time'
                                type='text'
                                placeholder="Hours"
                                // required
                                value={bake_time_hrs}
                                onChange={(e) => setBake_time_hrs(e.target.value)}
                            />
                            <input
                                name='bake-time'
                                type='text'
                                placeholder="Minutes"
                                // required
                                value={bake_time_mins}
                                onChange={(e) => setBake_time_mins(e.target.value)}
                            />
                        </div>
                        <label for='bake-time'><span className='asterisk'>*</span>Bake Time</label>
                    </div>
                    <div className='temp-container'>
                        <div className="input-container">
                            <input
                                name='bake-temp'
                                type='text'
                                placeholder="400"
                                required
                                value={baking_temp}
                                onChange={(e) => setBaking_temp(e.target.value)}
                            />
                            <label for='bake-temp'><span className='asterisk'>*</span>
                                <span className='obelus'>???</span>
                                Baking Temperature
                            </label>
                        </div>
                        {/* <label>??F</label> */}
                    </div>
                    <div className="input-container">
                        <input
                            type='text'
                            name='yield'
                            placeholder="e.g. 1 loaf, 12 rolls"
                            required
                            value={total_yield}
                            onChange={(e) => setTotal_yield(e.target.value)}
                        />
                        <label for='yield'><span className='asterisk'>*</span>Yield</label>
                    </div>
                </div>
                <div className='form-bottom-container'>
                    <div className='footnotes'>
                        <h6><span className='asterisk'>*</span> = required</h6>
                        <h6><span className='obelus'>???</span> = all temps displayed in ??F</h6>
                    </div>
                    <div className='next-button-container'>
                        <h3>Next</h3>
                        <button className='arrow-button'>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </div>
            </form>
            {/* <div className='next-button-container'>
                    <HashLink smooth to={`/recipes/${recipe_id}#comments`} scroll={el => scrollWithOffset(el)}>
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </HashLink>
                </div> */}
        </div>
    )
}

export default NewRecipeForm

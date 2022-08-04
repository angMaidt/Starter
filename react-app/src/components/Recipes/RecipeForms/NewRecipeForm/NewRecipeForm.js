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
    const [proofing_time, setProofing_time] = useState('') //note, change prep time to proof time in db
    const [bake_time, setBake_time] = useState('')
    const [baking_temp, setBaking_temp] = useState('')
    const [total_yield, setTotal_yield] = useState('')

    const [recipe_id, setRecipe_id] = useState('')
    // console.log(recipe_id)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)
        const payload = {
            user_id: sessionUser.id,
            title,
            image_url,
            description,
            active_time,
            prep_time: proofing_time,
            bake_time,
            baking_temp,
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
                    <div className="input-container">
                        <label>Bake Time</label>
                        <input
                            type='text'
                            placeholder="How long did you bake the bread?"
                            required
                            value={bake_time}
                            onChange={(e) => setBake_time(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Baking Temp</label>
                        <input
                            type='text'
                            placeholder="200 °C"
                            required
                            value={baking_temp}
                            onChange={(e) => setBaking_temp(e.target.value)}
                        />
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
            <NewIngredientForm recipe_id={recipe_id}/>
            <NewInstructionForm recipe_id={recipe_id}/>
        </>
    )
}

export default NewRecipeForm

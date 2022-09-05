import { useEffect, useState } from 'react'
import { useDispatch} from "react-redux"
import { getRecipesThunk } from '../../../../store/recipe'
// import NewIngredientForm from '../NewIngredientForm/NewIngredientForm'
import './EditIngredientForm.css'


function EditIngredientForm({ ingredient, measurementUnits, recipe_id, showEdit, setShowEdit, showEditIng, setShowEditIng}) {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(ingredient.amount)
    const [unit, setUnit] = useState(ingredient.measurement_unit.id)
    // console.log(unit)

    const [food_stuff, setFood_stuff] = useState(ingredient.food_stuff)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    // const [isDone, setIsDone] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    // const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        let errors = []

        // if (!amount) errors.push('Looks like you forgot to enter an amount!')
        if (amount <= 0) errors.push('Looks like you tried to enter a negative amount or zero. Not likely, I think.')
        if (amount > 10000) errors.push('Looks like you tried to enter an amount over 10,000. Consider scaling your recipe down.')

        if (food_stuff.length < 2) errors.push('Please enter more than 1 character into ingredient name.')
        if (food_stuff.length > 50) errors.push('Please enter less than 50 characters into ingeredient name.')

        setValidationErrors(errors)
    }, [amount, unit, food_stuff])

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/recipes/ingredients/${ingredient.id}`, {
                method: 'DELETE'
            })

            await dispatch(getRecipesThunk())
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            amount,
            food_stuff,
            measurement_unit_id: unit,
            recipe_id
        }

        setHasSubmitted(true)
        if (validationErrors.length) return

        try {
            const res = await fetch(`/api/recipes/ingredients/${ingredient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                const data = await res.json()
                setShowEdit(!showEdit)
                // setIsDone(true)
            }

            await dispatch(getRecipesThunk())
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    // if (!showEditIng) setShowEdit(!showEdit)
    return (
        <div className='edit-ingredients-wrapper'>
            {/* <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p> */}
            {validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            {/* <div> */}
                <form className="form-container"
                    onSubmit={handleSubmit}
                    style={{ 'backgroundColor': 'pink', 'padding': '10px' }}>
                    {/* {ingredient} */}
                    <div className='form-wrapper'>
                        <div className='ingredient-input-container'>
                            <div className="input-container">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <label>Amount:</label>
                                </div>
                            </div>
                            <div className="input-container">
                                <div>
                                    <select
                                        type="number"
                                        placeholder={ingredient.measurement_unit}
                                        required
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        >
                                    {measurementUnits && (
                                        Object.values(measurementUnits).map(unit => (
                                            <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                        ))
                                    )}
                                    </select>
                                    <label>Unit:</label>
                                </div>
                            </div>
                            <div className="input-container unit">
                                {/* <div> */}
                                    <input
                                        type="text"
                                        placeholder="Flour, Water, etc."
                                        required
                                        value={food_stuff}
                                        onChange={(e) => setFood_stuff(e.target.value)}
                                        />
                                        <label>Ingredient:</label>
                                {/* </div> */}
                            </div>
                            <div className='edit-button-container ingredient'>
                                <span onClick={() => setShowEdit(!showEdit)} className='cancel-button'>Cancel</span>
                                <button type='submit' className='ing submit'>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            {/* </div> */}
        </div>
    )
}

export default EditIngredientForm

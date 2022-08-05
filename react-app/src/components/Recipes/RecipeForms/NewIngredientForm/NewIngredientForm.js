import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from '../../../../store/recipe'

function NewIngredientForm({ recipe_id, measurementUnits, edit }) {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState(1)
    const [food_stuff, setFood_stuff] = useState('')
    // const [measurementUnits, setMeasurementUnits] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [ingredients, SetIngredients] = useState([])

    useEffect(() => {
        let errors = []

        if (!amount) errors.push('Looks like you forgot to enter an amount!')
        if (amount < 0) errors.push('Looks like you tried to enter a negative amount. Not likely, I think.')
        if (amount > 10000) errors.push('Looks like you tried to enter an amount over 10,000. Consider scaling your recipe down.')

        if (food_stuff.length < 1) errors.push('Please enter more than 1 character into ingredient name.')
        if (food_stuff.length > 50) errors.push('Please enter less than 50 characters into ingeredient name.')

        setValidationErrors(errors)
    }, [amount, unit, food_stuff])

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)

        const payload = {
            amount,
            food_stuff,
            measurement_unit_id: unit,
            recipe_id
        }

        try {
            const res = await fetch('/api/recipes/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                const data = await res.json()
                if (data) {
                    SetIngredients([...ingredients, data])
                    setAmount('')
                    setFood_stuff('')
                    setUnit(1)
                    await dispatch(getRecipesThunk())
                }
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }

    }

    return (
        <>
            <h3>Add Ingredients!</h3>
            {hasSubmitted && validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            {!edit && ingredients.length > 0 ?
            <ul>
                {Object.values(ingredients).map(ingredient => (
                    <li key={ingredient.id}>
                        <p>{ingredient.amount} {ingredient. measurement_unit.unit} {ingredient.food_stuff}</p>
                    </li>
                ))}
            </ul>
            :
            null
            }
            <form className="ingredient-form" onSubmit={handleSubmit}>
                <div className='ingredient-input-container'>
                    <div className="input-container">
                        <label>Amount</label>
                        <input
                            type="number"
                            placeholder="0"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Unit</label>
                        <select
                            type="number"
                            placeholder="0"
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
                    </div>
                    <div className="input-container">
                        <label>Ingredient</label>
                        <input
                            type="text"
                            placeholder="Flour, Water, etc."
                            required
                            value={food_stuff}
                            onChange={(e) => setFood_stuff(e.target.value)}
                        />
                    </div>
                </div>
                <button>Submit!</button>
            </form>
        </>
    )
}

export default NewIngredientForm

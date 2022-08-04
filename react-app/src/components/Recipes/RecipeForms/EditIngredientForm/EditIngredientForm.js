import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"


function EditIngredientForm({ ingredient, measurementUnits, recipeId }) {
    const [amount, setAmount] = useState(ingredient.amount)
    const [unit, setUnit] = useState(ingredient.measurement_unit.id)
    const [food_stuff, setFood_stuff] = useState(ingredient.food_stuff)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/recipes/ingredients/${ingredient.id}`, {
                method: 'DELETE'
            })
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            amount,
            food_stuff,
            measurement_unit_id: unit,
            recipe_id: recipeId
        }

        setHasSubmitted(true)

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
                // SetIngredients([...ingredients, data])
                // setAmount('')
                // setFood_stuff('')
                // setUnit(1)
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            <form className="ingredient-form" onSubmit={handleSubmit}>
                {/* {ingredient} */}
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
            <button onClick={handleDelete}>Delete Ingredient</button>
        </>
    )
}

export default EditIngredientForm

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

function NewIngredientForm({ recipe_id, measurementUnits }) {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState(1)
    const [food_stuff, setFood_stuff] = useState('')
    // const [measurementUnits, setMeasurementUnits] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [ingredients, SetIngredients] = useState([])
    // console.log(ingredients)


    // useEffect(() => {
    //     async function fetchUnits() {
    //         const res = await fetch('/api/recipes/units')
    //         const data = await res.json()
    //         setMeasurementUnits(data.units)
    //     }
    //     fetchUnits()
    // }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            amount,
            food_stuff,
            measurement_unit_id: unit,
            recipe_id
        }

        setHasSubmitted(true)

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
                SetIngredients([...ingredients, data])
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }

    }

    return (
        <>
            <h3>Add Ingredients!</h3>
            {ingredients.length < 1 ?
            <p>Add some ingredients to your recipe!</p>
            :
            <ul>
                {Object.values(ingredients).map(ingredient => (
                    <li key={ingredient.id}>
                        <p>{ingredient.amount} {ingredient. measurement_unit.unit} {ingredient.food_stuff}</p>
                    </li>
                ))}
            </ul>
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

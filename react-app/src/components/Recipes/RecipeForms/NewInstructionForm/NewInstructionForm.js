import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from '../../../../store/recipe'

function NewInstructionForm({ recipe_id, existing_list_order }) {
    // console.log(existing_list_order)
    const dispatch = useDispatch()
    const [list_order, setList_order] = useState(!existing_list_order ? 1 : existing_list_order + 1)
    const [specification, setSpecification] = useState()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [instructions, SetInstructions] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            list_order,
            specification,
            recipe_id
        }

        setHasSubmitted(true)

        try {
            const res = await fetch('/api/recipes/instructions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                const data = await res.json()
                await dispatch(getRecipesThunk())
                SetInstructions([...instructions, data])
                setList_order(list_order + 1)
                setSpecification('')
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            <h3>Add Instructions!</h3>
            {instructions.length > 0 ?
            <ol>
                {Object.values(instructions).map(instruction => (
                    <li key={instruction.id}>
                        <p>{instruction.specification}</p>
                    </li>
                ))}
            </ol>
            :
            null
            }
            <form onSubmit={handleSubmit}>
                <div className="instruction-input-container">
                    <div className="input-container">
                        <label>Step {list_order}.</label>
                        <textarea
                            placeholder="Step 1. Make the loaf, Step 2. Profit ?"
                            required
                            value={specification}
                            onChange={(e)=> setSpecification(e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
                <button>Submit!</button>
            </form>
        </>
    )
}

export default NewInstructionForm

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

function NewInstructionForm({ recipe_id }) {
    const [list_order, setList_order] = useState(1)
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
        setList_order(list_order + 1)

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
                SetInstructions([...instructions, data])
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }

    }


    return (
        <>
            <h3>Add Instructions</h3>
            {!instructions ?
            <p>Add some instructions to your recipe!</p>
            :
            <ol>
                {Object.values(instructions).map(instruction => (
                    <li key={instruction.id}>
                        <p>{instruction.specification}</p>
                    </li>
                ))}
            </ol>
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

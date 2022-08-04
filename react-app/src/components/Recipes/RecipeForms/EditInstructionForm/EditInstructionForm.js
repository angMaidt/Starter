import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

function EditInstructionForm({ instruction, recipeId }) {
    const [list_order, setList_order] = useState(instruction.list_order)
    const [specification, setSpecification] = useState(instruction.specification)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            list_order,
            specification,
            recipe_id: recipeId
        }

        setHasSubmitted(true)

        try {
            const res = await fetch(`/api/recipes/instructions/${instruction.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                const data = await res.json()
                // SetInstructions([...instructions, data])
                // setList_order(list_order + 1)
                // setSpecification('')
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
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

export default EditInstructionForm

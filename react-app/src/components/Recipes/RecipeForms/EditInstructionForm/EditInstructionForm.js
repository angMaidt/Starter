import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from '../../../../store/recipe'

function EditInstructionForm({ instruction, recipe_id, current_length }) {
    const dispatch = useDispatch()
    const [list_order, setList_order] = useState(instruction.list_order)
    const [specification, setSpecification] = useState(instruction.specification)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        let errors = []

        if (!specification) errors.push('Please enter an instruction for this step.')
        if (specification.length < 4) errors.push('Please enter more than 3 characters for your instruction.')
        if (specification.length > 999) errors.push('Looks like you tried to enter over 1000 characters for this step.')

        setValidationErrors(errors)
    }, [specification])

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/recipes/instructions/${instruction.id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                // if()
                const data = await res.json()
            }
            await dispatch(getRecipesThunk())
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            list_order,
            specification,
            recipe_id
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
                await dispatch(getRecipesThunk())
            }
        } catch (e) {
            setValidationErrors(e.errors)
        }
    }

    return (
        <>
            {validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            <p>{instruction.list_order}. {instruction.specification}</p>
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
                <button disabled={validationErrors.length > 0}>Submit!</button>
            </form>
            {instruction.list_order === current_length && <button onClick={handleDelete}>Delete Instruction</button>}
        </>
    )
}

export default EditInstructionForm

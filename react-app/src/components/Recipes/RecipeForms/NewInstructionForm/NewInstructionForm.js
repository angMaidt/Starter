import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from '../../../../store/recipe'

function NewInstructionForm({ recipe_id, existing_list_order, edit }) {
    // console.log(existing_list_order)
    const dispatch = useDispatch()
    //might not be neccessary anymore
    const [list_order, setList_order] = useState(!existing_list_order ? 1 : existing_list_order + 1)
    const [specification, setSpecification] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [instructions, SetInstructions] = useState([])

    useEffect(() => {
        let errors = []

        if (!specification) errors.push('Please enter an instruction for this step.')
        if (specification.length < 4) errors.push('Please enter more than 3 characters for your instruction.')
        if (specification.length > 1000) errors.push('Looks like you tried to enter over 1000 characters for this step.')

        setValidationErrors(errors)
    }, [specification])

    const handleSubmit = async(e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (validationErrors.length) return alert('Cannot Submit!')

        const payload = {
            list_order,
            specification,
            recipe_id
        }

        setHasSubmitted(false)

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
            {hasSubmitted && validationErrors.length > 0 &&
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li className='error' key={error}>{error}</li>
                    ))}
                </ul>
            }
            {!edit && instructions.length > 0 ?
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
            <form onSubmit={handleSubmit} className="ingredient-form" >
                <div className="instruction-input-container">
                    <div className="input-container">
                        <textarea
                            placeholder="Step 1. Make the loaf, Step 2. Profit ?"
                            required
                            value={specification}
                            onChange={(e)=> setSpecification(e.target.value)}
                            >
                        </textarea>
                        <label>Step {list_order}.</label>
                    </div>
                </div>
                <div className='add-button-wrapper'>
                    <div className='next-button-container add-button'>
                        <h3 className='small-submit'>Add</h3>
                        <button className='arrow-button'>
                            <i className="fa-solid fa-plus add"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewInstructionForm

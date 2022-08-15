import { useEffect, useState } from 'react'
import { useDispatch} from "react-redux"
import { getRecipesThunk } from '../../store/recipe'
import EditInstructionForm from '../Recipes/RecipeForms/EditInstructionForm/EditInstructionForm'

function Instruction({ instruction, recipe_id, showEditInst, setShowEditInst, currentLength }) {
    const dispatch = useDispatch()
    //2 to avoid conflicts with ingredients edit
    const [showEdit2, setShowEdit2] = useState()

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
            console.log('delete instruction failed! ' + e)
        }
    }

    return (
        (showEditInst && showEdit2 ?
            <EditInstructionForm
                instruction={instruction}
                showEdit2={showEdit2}
                setShowEdit2={setShowEdit2}
                // currentLength={currentLength}
                recipe_id={recipe_id}
                />
        :
        showEditInst ?
            <div className='instruction-container'>
                <p key={instruction.id} className='instruction'>
                    {instruction.list_order}. {instruction.specification}
                </p>
                <div>
                    <div onClick={() => setShowEdit2(!showEdit2)}><span>edit</span></div>
                    {instruction.list_order === currentLength && <div onClick={handleDelete}><span>delete</span></div>}
                </div>
            </div>
            :
            <div className='header-button-container'>
                <p key={instruction.id}>{instruction.list_order}. {instruction.specification}</p>
            </div>
        )
    )
}

export default Instruction

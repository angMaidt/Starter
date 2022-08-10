import { useEffect, useState } from 'react'
import { useDispatch} from "react-redux"
import { getRecipesThunk } from '../../store/recipe'
import EditIngredientForm from '../Recipes/RecipeForms/EditIngredientForm/EditIngredientForm'

function Ingredient({ recipe, ingredient, showEditIng, wsetShoEditIng, measurementUnits }) {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)
    const [showEdit, setShowEdit] = useState()

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/recipes/ingredients/${ingredient.id}`, {
                method: 'DELETE'
            })

            await dispatch(getRecipesThunk())
        } catch (e) {
            console.log('delete ingredient failed! ' + e)
        }
    }

    return (
        (showEditIng && showEdit ?
        <EditIngredientForm
            ingredient={ingredient}
            measurementUnits={measurementUnits}
            recipe_id={recipe.id}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            // showEditIng={showEditIng}
            // setShowEditIng={setShowEditIng}
            />
        :
        showEditIng ?
            <div>
                <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff}</p>
                {/* <div onClick={() => setShowEdit(!showEdit)}><i className="fa-solid fa-pen"></i></div> */}
                <div onClick={() => setShowEdit(!showEdit)}><span>edit</span></div>
                <div onClick={handleDelete}><span>delete</span></div>
            </div>
            :
            <div className='header-button-container'>
                <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff}</p>
            </div>)
        // ingredient, measurementUnits, recipe_id, showEdit, setShowEdit
        // <EditIngredientForm ingredient={ingredient} measurementUnits={measurementUnits} recipe_id={recipe.id} showEdit={showEdit} setShowEdit={setShowEdit} />
    )
}

export default Ingredient

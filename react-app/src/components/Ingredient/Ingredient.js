// import { useState } from 'react'
// import { useSelector } from 'react-redux'
import EditIngredientForm from '../Recipes/RecipeForms/EditIngredientForm/EditIngredientForm'

function Ingredient({ recipe, ingredient, showEditIng, setShowEditIng, measurementUnits, showEditSingleIng, setShowEditSingleIng }) {
    // const sessionUser = useSelector(state => state.session.user)
    // const [showEdit, setShowEdit] = useState()

    return (
        (showEditSingleIng ?
        <EditIngredientForm
            ingredient={ingredient}
            measurementUnits={measurementUnits}
            recipe_id={recipe.id}
            showEditSingleIng={showEditSingleIng}
            setShowEditSingleIng={setShowEditSingleIng}
            // showEditIng={showEditIng}
            // setShowEditIng={setShowEditIng}
            />
        :
        showEditIng ?
            <div className='header-button-container'>
                <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff}</p>
                <div onClick={() => setShowEditSingleIng(!showEditSingleIng)}><i className="fa-solid fa-pen"></i></div>
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

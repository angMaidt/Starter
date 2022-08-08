import { useSelector } from 'react-redux'
import EditIngredientForm from '../Recipes/RecipeForms/EditIngredientForm/EditIngredientForm'

function Ingredient({ recipe, ingredient, showEditIng, setShowEditIng }) {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div header-button-container>
            <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p>
            {/* {sessionUser && sessionUser.id === recipe.user.id &&
            <div onClick={() => setShowEditIng(!showEditIng)}><i className="fa-solid fa-pen"></i></div>
                // <EditIngredientForm/>
            } */}
        </div>
    )
}

export default Ingredient


//Actions
const GET_RECIPES = 'recipes/GET_RECIPES'

const POST_RECIPE = 'recipes/POST_RECIPE'

const EDIT_RECIPE = 'recipes/EDIT_RECIPE'

const DELETE_RECIPE ='recipes/DELETE_RECIPE'

//Action Creators
const getRecipes = (recipes) => {
    type: GET_RECIPES,
    recipes
}

const postRecipe = (recipe) => {
    type: POST_RECIPE,
    recipe
}

const editRecipe = (recipe) => {
    type: EDIT_RECIPE,
    recipe
}

const deleteRecipe = (recipe) => {
    type: DELETE_RECIPE,
    recipe
}

//Thunks
export const getRecipesThunk = () => async (dispatch) => {
    const res = await fetch('/api/recipes')
    if (res.ok) {
        const data = await res.json()
        dispatch(getRecipes(data.recipes))
    } else {
        const err = await res.json()
        throw err
    }
}

export const postRecipeThunk = (recipe) => async (dispatch) => {
    const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(postRecipe(data.recipe))
        return data.recipe
    } else {
        const err = await res.json()
        throw err
    }
}

export const editRecipeThunk = (recipe) => async (dispatch) => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        return data.recipe
    } else {
        const err = await res.json()
        throw err
    }
}

export const deleteRecipeThunk = (recipe) => async (dispatch) => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editRecipe(data.recipe))
        return data.recipe
    } else {
        const err = await res.json()
        throw err
    }
}

//Reducer
initialState = {}
export default function recipe_reducer(state = initialState, action) {
    let newState = {}
    switch(action.type){
        case GET_RECIPES:
            newState = { ...state }
            action.recipes.forEach(recipe => newState[recipe.id] = recipe)
            return newState
        case POST_RECIPE:
            newState = { ...state }
            newState[action.recipe.id] = action.recipe
            return newState
        case EDIT_RECIPE:
            newState = { ...state, [action.recipe.id]: action.recipe }
            return newState
        case DELETE_RECIPE:
            newState = { ...state }
            delete newState[action.recipe.id]
            return newState
        default:
            return state;
    }
}

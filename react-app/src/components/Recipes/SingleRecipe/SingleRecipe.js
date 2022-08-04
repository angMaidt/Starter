import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function SingleRecipe() {
    const { id } = useParams()
    const recipe = useSelector(state => state.recipes[id])
    // console.log(recipe)

    const convert_ms = (ms) => {
        const mins = Math.floor((ms/1000)/60)
        if (mins >= 60) {
            const hrs = Math.floor(mins/60)
            const remaining_mins = Math.floor(mins % 60)
            return [hrs, remaining_mins]
        }
        return mins
    }

    const convert_to_fahrenheit = (celsius) => {
        const farenheit = celsius * 1.8 + 32
        return farenheit
    }

    // const calculate_hydration = (flour, water) => {
    //     const percentage = (water/flour) * 100
    //     return percentage
    // }

    // console.log(calculate_hydration(10000, 2000))

    // let flour_amount, water_amount
    // recipe && recipe.ingredients.map(ing => {
    //     if (ing.food_stuff.includes('flour')) {
    //         flour_amount = ing.amount
    //     } else if (ing.food_stuff.includes('water')) {
    //         water_amount = ing.amount
    //     } else return 'Not Available'
    // })

    // console.log('flour: ' + flour_amount)
    // console.log('water: ' + water_amount)

    if (!recipe) return null
    return (
        <>
            <h1>Welcome to Single Recipe!</h1>
            <div>
                <h2>{recipe.title}</h2>
                <p>By {recipe.user.username}</p>
                <p>Posted {recipe.created_at}</p>
            </div>
            <div>
                <img src={recipe.image_url} alt={`recipe-${recipe.id}`} />
            </div>
            <p>{recipe.description}</p>
            <div style={{ 'border': '1px solid black' }}>
                <h3>Recipe Facts</h3>
                {/* <p>Hydration: {calculate_hydration(flour_amount, water_amount)}%</p> */}
                <p>Active Time: {convert_ms(recipe.active_time)} mins</p>
                <p>Proofing Time: {convert_ms(recipe.prep_time)} mins</p>
                <p>Baking Time: {convert_ms(recipe.bake_time)} mins</p>
                {/* <p>Total Time:
                    {convert_ms(recipe.bake_time + recipe.active_time + recipe.prep_time)[0]} hour
                    {convert_ms(recipe.bake_time + recipe.active_time + recipe.prep_time)[1]} mins
                </p> */}
                <p>Baking Temp: {recipe.baking_temp} °C </p>
                <p>Total Yield: {recipe.total_yield}</p>
            </div>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            <p>{ingredient.amount} {ingredient.measurement_unit.unit} {ingredient.food_stuff} </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Instructions</h3>
                <ol>
                    {recipe.instructions.map(instruction => (
                        <li key={instruction.id}>
                            <p>{instruction.specification}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default SingleRecipe

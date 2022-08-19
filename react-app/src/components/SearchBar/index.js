import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { getRecipesThunk } from '../../store/recipe'

function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredResults, setFilteredResults] = useState([])
    const recipes = useSelector(state => state.recipes)

    console.log(recipes)

    useEffect(() => {
        const fetchRecipes = async () => {
            await dispatch(getRecipesThunk())
        }
        fetchRecipes().catch(console.error)
    }, [dispatch])

    const handleFilter = (e) => {
        const searchWord = e.target.value
        setSearchTerm(searchWord)
        const newFilter = Object.values(recipes).filter(recipe => {
            return recipe.title.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredResults([])
        } else {
            setFilteredResults(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredResults([])
        setSearchTerm('')
        // history.push()
    }

    const cancelSearch = () => {
        setFilteredResults([])
        setSearchTerm('')
    }


    return (
        <div className='search'>
            <form className='search-inputs'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleFilter}
                    placeholder='Search recipes by title!'/>
                <div className='search-icon'>
                    {!searchTerm.length ?
                        <div>Search!</div>
                    :
                        <>
                            <div onClick={cancelSearch}>Cancel Search</div>
                            <div onClick={clearInput}></div>
                        </>
                    }
                </div>
            </form>
            {filteredResults.length > 0 && (
                <div className='data-result' style={{ 'height': '100%', 'backgroundColor': 'white'}}>
                    {filteredResults && (
                        filteredResults.map((result, idx) => (
                        <div key={idx}>
                            <Link to={`/recipes/${result.id}`}>
                                {result.title}
                            </Link>
                        </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar

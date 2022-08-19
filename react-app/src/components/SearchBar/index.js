import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { getRecipesThunk } from '../../store/recipe'
import './SearchBar.css'

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

    // const cancelSearch = () => {
    //     setFilteredResults([])
    //     setSearchTerm('')
    // }


    return (
        <div className='search'>
            <form className='search-inputs'>
                {/* <img
                    src='../../../static/icon-search.svg'
                    alt='icon-search'
                    id='icon-search' /> */}
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleFilter}
                    placeholder='Search recipes...'/>
                <div className='clear-search-container'>
                    {!searchTerm.length ?
                        null
                    :
                        <>
                            {/* <div onClick={cancelSearch}>Cancel Search</div> */}
                            <i className="fa-solid fa-xmark clear-search"
                                onClick={clearInput}
                                title='Clear Search'></i>
                            {/* <div className='clear-search' onClick={clearInput}>X</div> */}
                        </>
                    }
                </div>
            </form>
            {filteredResults.length > 0 && (
                <div className='data-result'>
                    {filteredResults && (
                        filteredResults.slice(0, 5).map((result, idx) => (
                        <div key={idx} className='search-result'>
                            <Link to={`/recipes/${result.id}`} style={{ 'textDecoration': 'none', 'color': 'var(--dark-blue)' }}>>
                                {result.title}
                                {/* {console.log(result.title)} */}
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

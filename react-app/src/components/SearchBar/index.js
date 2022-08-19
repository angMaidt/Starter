import { useState } from "react"
import { Link } from 'react-router-dom'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    console.log(typeof results.search_results)

    const handleSearch = async (e) => {
        // e.preventDefault()
        setSearchTerm(e.target.value)
        if (searchTerm === '') {
            setResults([])
            return
        }

        const payload = {
            search_term: searchTerm
        }

        const res = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            const data = await res.json()
            setResults(data)
        }
    }

    // const search_results = Object.values(results.search_results)

    return (
        <div className='search'>
            <div className='search-inputs'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='Search recipes by title!'/>
                <div className='search-icon'></div>
            </div>
            <div className='data-result' style={{ 'height': '100%', 'backgroundColor': 'white'}}>
                {results.search_results && (
                    results.search_results.map((result, idx) => (
                    <Link key={idx} to={`/recipes/${result.id}`}>
                        {result.title}
                    </Link>
                        // <div key={idx}>{result.title}</div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SearchBar

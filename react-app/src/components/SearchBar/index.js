import { useState } from "react"


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    console.log(results)

    const handleSearch = async (e) => {
        // e.preventDefault()
        setSearchTerm(e.target.value)
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
            <div className='data-result'></div>
        </div>
    )
}

export default SearchBar

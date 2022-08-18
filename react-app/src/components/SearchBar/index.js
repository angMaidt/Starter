import { useEffect, useState } from "react"


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect = () => ({
        
    }, [searchTerm])

    return (
        <div className='search'>
            <div className='search-inputs'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search recipes by title!'/>
                <div className='search-icon'></div>
            </div>
            <div className='data-result'></div>
        </div>
    )
}

export default SearchBar

import React from 'react'

const SearchBox = ({handleChange, value, handleClear}) => {

  return (
    <div className="serchBar">
        <input className="searchInput" onChange={handleChange} placeholder="search" value={value}/>
        <button className="clearButton" onClick={handleClear}>
            <span className='clearButtonSpan'>clear</span>
        </button>
    </div>
  )
}

export default SearchBox;
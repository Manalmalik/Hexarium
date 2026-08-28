function Search({searchTerm, handleSearchInput, handleEnterKeyPress }) {
  return (
    <div className="searchbar">
        <label> Search Records </label>
        <div className="search-input">
            <input type="text" id="search" value={searchTerm} placeholder="Type to search..." onChange={(e) => handleSearchInput(e)} onKeyDown={(e) => handleEnterKeyPress(e)}/>
            <i className="fa-solid fa-search" ></i>
        </div>
    </div>
  )
}

export default Search

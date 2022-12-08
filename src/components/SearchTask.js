const SearchTask = ({ search, setSearch }) => {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">
                search here ^^
            </label>
            <input
                id="search"
                type="text"
                role='searchbox'
                placeholder="search here ^^"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
}

export default SearchTask;
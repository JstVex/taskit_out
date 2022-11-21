// import { useState } from "react";

const SearchTask = ({ search, setSearch }) => {
    return (
        <>
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
            {/* <div class="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input type="text" class="form-control" placeholder="Search" />
            </div> */}
        </>
    );
}

export default SearchTask;
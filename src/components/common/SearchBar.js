import { useState } from "react";
import SearchBarCSS from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = e => setSearchTerm(e.target.value);
    const onSearchClick = () => onSearch(searchTerm);

    return (
        <div>
            <select className={ SearchBarCSS.serachBarCategory}>
                <option>제목</option>
                <option>작성자</option>
                <option>제목+작성자</option>
            </select>
            <input type="text" className={ SearchBarCSS.searchBar } onChange={onInputChange} />
            <button className={ SearchBarCSS.searchBarBtn } onClick={onSearchClick}>검색</button>
        </div>
    )
}

export default SearchBar;
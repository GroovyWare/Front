import { useState } from "react";
import SearchBarCSS from "./SearchBar.module.css";

function EquipmentSearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCondition, setSearchCondition] = useState('eqpTitle');
    const onInputChange = e => setSearchTerm(e.target.value);
    const onSearchClick = () => onSearch(searchTerm, searchCondition);

    return (
        <div>
            <select className={ SearchBarCSS.serachBarCategory} value={searchCondition} onChange={(e) => setSearchCondition(e.target.value)}>
                <option value="eqpTitle">기구명</option>
                <option value="eqpInspector">점검자</option>
            </select>
            <input type="text" className={ SearchBarCSS.searchBar } onChange={onInputChange} />
            <button className={ SearchBarCSS.searchBarBtn } onClick={onSearchClick}>검색</button>
        </div>
    )
}

export default EquipmentSearchBar;

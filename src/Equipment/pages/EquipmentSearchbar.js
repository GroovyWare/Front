import { useState } from "react";
import EquipmentSearchbarCSS from "./EquipmentSearchbar.module.css";
import searchImg from "../../components/common/img/search.svg"

function EquipmentSearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCondition, setSearchCondition] = useState('eqpTitle');
    const onInputChange = e => setSearchTerm(e.target.value);
    const onSearchClick = () => onSearch(searchTerm, searchCondition);

    return (
        <div className={ EquipmentSearchbarCSS.searchbar }>
            <input
                type="text"
                placeholder="이름을 입력해주세요"
                // onChange={ searchChangeHandler }
            />
            <button>
                <img src={ searchImg } alt="검색" className={ EquipmentSearchbarCSS.search }/>
            </button>
        </div>
    )
}

export default EquipmentSearchBar;

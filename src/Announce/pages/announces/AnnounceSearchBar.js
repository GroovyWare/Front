import { useState } from "react";
import AnnounceSearchbarCSS from "./AnnounceSearchbar.module.css";
import searchImg from "../../../components/common/img/search.svg"

function AnnounceSearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = e => setSearchTerm(e.target.value);
    const onSearchClick = () => onSearch(searchTerm);

    return (
        <div className={ AnnounceSearchbarCSS.searchbar }>
            <input
                type="text"
                placeholder="이름을 입력해주세요"
                // onChange={ searchChangeHandler }
            />
            <button>
                <img src={ searchImg } alt="검색" className={ AnnounceSearchbarCSS.search }/>
            </button>
        </div>
    )
}

export default AnnounceSearchBar;
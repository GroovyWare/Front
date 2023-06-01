import { useState } from "react";
import MemberItem from "../items/MemberItem";
import MemberListCSS from "./MemberList.module.css";
import { useNavigate } from "react-router-dom";




function MemberList({memberList}) {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    /* 검색어 입력 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }
    
    /* enter key 입력 검색 */
    const onEnterKeyHandler = (e) => {
        if(e.key === 'Enter') {
            console.log('Enter key :', search);
            navigate(`/member/members/search?search=${search}`);
        }
    }

    /* 검색 버튼 */
    const onClickSearchHandler = () => {
        navigate(`/member/members/search?search=${search}`);
    }


    return(
        <>
        <div className={ MemberListCSS.searchBoxWarp}>
            <div className={MemberListCSS.pageTitle}>회원 조회</div>

            <div>
                <input
                    className={ MemberListCSS.searchBox }
                    type="text"
                    placeholder="회원명 검색"
                    onChange={onSearchChangeHandler}
                    onKeyUp={ onEnterKeyHandler}
                />
                <button
                    className={ MemberListCSS.searchBtn}
                    onClick={onClickSearchHandler}
                >
                    검색
                </button>
            </div>
        </div>   
            
           <table className={MemberListCSS.contentTb}>
           <tr>
               <td className={MemberListCSS.contentTitle}>회원번호</td>
               <td className={MemberListCSS.contentTitle}>이름</td>
               <td className={MemberListCSS.contentTitle}>전화번호</td>
               <td className={MemberListCSS.contentTitle}>회원권</td>
               <td className={MemberListCSS.contentTitle}>횟수</td>
               <td className={MemberListCSS.contentTitle}>시작일</td>
               <td className={MemberListCSS.contentTitle}>종료일</td>
           </tr>
           </table>

            <div>
                {
                    Array.isArray(memberList) 
                    && memberList.map(member => <MemberItem key={member.memCode} member={member}/>)
                }
            </div>
        </>

    );

}


export default MemberList;
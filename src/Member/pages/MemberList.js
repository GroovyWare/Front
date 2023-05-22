import MemberItem from "../items/MemberItem";
import MemberCSS from "../items/MemberItem.module.css";



function MemberList({memberList}) {

    return(
        <>
            <div className={ MemberCSS.titleDiv }>
            <div>회원 조회</div>
            </div>
            <div className={ MemberCSS.listTitleDiv }>
                <tr>
                    <div className={ MemberCSS.contentWrap }>
                        <div><th>회원번호</th></div>
                        <div><th>이름</th></div>
                        <div><th>전화번호</th></div>
                        <div><th>회원권</th></div>
                        <div><th>횟수</th></div>
                        <div><th>시작일</th></div>
                        <div><th>종료일</th></div>
                    </div>
                </tr>
            </div>

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
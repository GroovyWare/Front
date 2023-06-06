
import MemberItem from "../items/MemberItem";
import MemberListCSS from "./MemberList.module.css";



function MemberList({memberList}) {


    return(
        <>
        <div>
            <div className={MemberListCSS.pageTitle}>회원 조회</div>
        </div> 
        <hr className={MemberListCSS.titleLine}></hr>
            
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
import MemberItem from "../items/MemberItem";



function MemberList({memberList}) {

    return(
        <div>
            {
                Array.isArray(memberList) 
                && memberList.map(member => <MemberItem key={ member.memCode} member={member}/>)
            }
        </div>
    );

}


export default MemberList;
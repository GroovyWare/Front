import MemberPlayItem from "../item/MemberPlayItem";

function MemberPlayList({MemberPlayList}){

    return(
        <div>
            {
                Array.isArray(MemberPlayList) && MemberPlayList.map(member => <MemberPlayItem key={member.resHistory} member={member}/>)
            }
        </div>
    )
}

export default MemberPlayList;
import MemberPlayItem from "../item/MemberPlayItem";

function MemberPlayList({memberList}){

    return(
        <>
            {memberList && memberList.data.data.map((member) => (
                <div>
                    {member.memName}
                </div>
            ))}
        </>
    )
}

export default MemberPlayList;
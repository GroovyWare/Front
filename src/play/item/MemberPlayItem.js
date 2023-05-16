

function MemberPlayItem({memberPlayItem : {memCode, passCode, resStart, resEnd, empCode}}){
    return(
        <>
            {memCode}
            {passCode}
            {resStart}
            {resEnd}
            {empCode}
        </>
    )
}

export default MemberPlayItem;
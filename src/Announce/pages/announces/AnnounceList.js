import AnnounceItem from "../../items/AnnounceItem";

function AnnounceList({ announceList }) {
    return (
        <table>
            <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {
                Array.isArray(announceList)
                && announceList.map(announce => <AnnounceItem key={ announce.announceCode } announce={announce}/>)
            }
            </tbody>
        </table>
    );
}
   
export default AnnounceList;